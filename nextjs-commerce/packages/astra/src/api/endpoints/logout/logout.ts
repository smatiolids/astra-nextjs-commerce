import { serialize } from 'cookie'
import type { LogoutEndpoint } from '.'
import { redirect } from 'next/dist/server/api-utils'

const logout: LogoutEndpoint['handlers']['logout'] = async ({
  body: { redirectTo },
  config,
}) => {
  console.log('logout', redirectTo)
  const headers = {
    'Set-Cookie': serialize(config.customerCookie, '', {
      maxAge: -1,
    }),
  }

  return redirectTo
    ? {
        data: {
          redirectTo,
          headers,
        },
      }
    : {
        data: {
          redirectTo: '/',
          headers,
        },
      }
}

export default logout
