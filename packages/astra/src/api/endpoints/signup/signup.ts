import { getCustomerByEmailQuery } from '../../../utils/graphql/get-user-by-email-query'
import type { SignupEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { v4 as uuidv4 } from 'uuid'
import { hashSync } from 'bcryptjs'
import { addCustomer } from '../../../utils/graphql/add-customer'

// import { BigcommerceApiError } from '../../utils/errors'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  body: { firstName, lastName, email, password },
  config,
  commerce,
}) => {
  console.log('Signup', firstName, lastName, email, password)

  const { data: checkByEmail } = await config.fetch(getCustomerByEmailQuery, {
    variables: {
      email,
    },
  })

  console.log('checkByEmail', checkByEmail)

  if (checkByEmail.customers.values.length > 0) {
    throw new CommerceAPIError('Email already in use', {
      status: 400,
      code: 'duplicated_email',
    })
  }

  const { data } = await config.fetch(addCustomer, {
    variables: {
      email,
      firstName,
      lastName,
      password: hashSync(password, 10),
      customerId: uuidv4(),
    },
  })

  const res = new Response()

  // Login the customer right after creating it
  await commerce.login({ variables: { email, password }, res, config })

  return {
    headers: res.headers,
  }
}

export default signup
