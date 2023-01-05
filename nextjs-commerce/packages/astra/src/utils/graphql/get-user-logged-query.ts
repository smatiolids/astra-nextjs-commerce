export const getLoggedUserByEmailQuery = /* GraphQL */ `
  query getLoggedInCustomerQuery($email: String!) {
    customers(options: { pageSize: 1 }, filter: { email: { eq: $email } }) {
      values {
        customerId: customerid
        email
        firstName: firstname
        lastName: lastname
        email
        company
        notes
        phone
      }
    }
  }
`
