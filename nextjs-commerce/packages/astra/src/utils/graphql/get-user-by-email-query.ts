export const getCustomerByEmailQuery = /* GraphQL */ `
  query GetCustomerbyEmail($email: String!) {
    customers(options: { pageSize: 1 }, filter: { email: { eq: $email } }) {
      values {
        customerId: customerid
        email
      }
    }
  }
`
