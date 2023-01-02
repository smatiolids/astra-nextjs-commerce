// import type { GetLoggedInCustomerQuery } from '../../../../schema'
import type { CustomerEndpoint } from '.'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import { getLoggedUserByEmailQuery } from '../../../utils/graphql/get-user-logged-query'
import jwtDecode, { JwtPayload } from 'jwt-decode'
// export const getLoggedInCustomerQuery = /* GraphQL */ `
//   query getLoggedInCustomer {
//     customer {
//       entityId
//       firstName
//       lastName
//       email
//       company
//       customerGroupId
//       notes
//       phone
//       addressCount
//       attributeCount
//       storeCredit {
//         value
//         currencyCode
//       }
//     }
//   }
// `

// export type Customer = NonNullable<GetLoggedInCustomerQuery['customer']>

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] =
  async ({ req, config }) => {
    const token: string | undefined = req.cookies.get(config.customerCookie)

    if (!token)
      return {
        data: null,
      }

    const token_decoded = jwtDecode<any>(<string>token, {})

    console.log('token_decoded', token_decoded)
    if (token_decoded.email) {
      return {
        data: {
          id: String(token_decoded.customerId),
          firstName: token_decoded.firstName,
          lastName: token_decoded.lastName,
          email: token_decoded.email,
        },
      }
    }
    // else if (!token) {
    //   const { data } = await config.fetch(
    //     getLoggedUserByEmailQuery,
    //     {
    //       variables: { email: token_decoded.email },
    //     },
    //     {
    //       'Set-Cookie': `${config.customerCookie}=${token}`,
    //     }
    //   )

    //   const customer = data.customers.values[0]

    //   if (!customer) {
    //     throw new CommerceAPIError('Customer not found', {
    //       status: 404,
    //     })
    //   }

    //   return {
    //     data: {
    //       id: String(customer.customerId),
    //       firstName: customer.firstName,
    //       lastName: customer.lastName,
    //       email: customer.email,
    //       company: customer.company || 'none',
    //       phone: customer.phone || 'none',
    //       notes: customer.notes || 'none',
    //     },
    //   }
    // }

    return {
      data: null,
    }
  }

export default getLoggedInCustomer
