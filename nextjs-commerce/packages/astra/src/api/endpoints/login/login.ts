import type { LoginEndpoint } from '.'

import { FetcherError } from '@vercel/commerce/utils/errors'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { getCookieExpirationDate } from '../../utils/get-cookie-expiration-date'
import { prepareSetCookie } from '../../utils/prepare-set-cookie'
import { getUserPassByEmail } from '../../../utils/graphql/get-user-pass-by-email-query'
import { compareSync } from 'bcryptjs'
import { userAgentFromString } from 'next/server'
const invalidCredentials = /invalid credentials/i

const login: LoginEndpoint['handlers']['login'] = async ({
  body: { email, password },
  config,
}) => {
  try {
    const { data: userData } = await config.fetch(getUserPassByEmail, {
      variables: { email },
    })

    if (!userData || !userData.customers || !userData.customers.values[0]) {
      throw new CommerceAPIError(
        'Cannot find an account that matches the provided credentials -1',
        {
          status: 401,
          code: 'invalid_credentials',
        }
      )
    }

    const user = userData.customers.values[0]

    if (!compareSync(password, user.password)) {
      throw new CommerceAPIError(
        'Cannot find an account that matches the provided credentials -2',
        {
          status: 401,
          code: 'invalid_credentials',
        }
      )
    }

    // Set Cookie
    const cookieExpirationDate = getCookieExpirationDate(
      config.customerCookieMaxAgeInDays
    )

    const token = { accessTokenExpiration: 1, ...user }
    delete token.password

    const authCookie = prepareSetCookie(
      config.customerCookie,
      token,
      token.accessTokenExpiration ? { expires: cookieExpirationDate } : {}
    )

    return { data: null, headers: { 'Set-Cookie': authCookie } }
  } catch (error) {
    // Check if the email and password didn't match an existing account
    if (
      error instanceof FetcherError &&
      invalidCredentials.test(error.message)
    ) {
      throw new CommerceAPIError(
        'Cannot find an account that matches the provided credentials',
        {
          status: 401,
          code: 'invalid_credentials',
        }
      )
    } else {
      throw error
    }
  }
}

export default login
