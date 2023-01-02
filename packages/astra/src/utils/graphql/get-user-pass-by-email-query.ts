export const getUserPassByEmail = /* GraphQL */ `
  query getUserPassByEmail($email: String!) {
    customers(options: { pageSize: 1 }, filter: { email: { eq: $email } }) {
      values {
        customerId: customerid
        email
        password
        firstName: firstname
        lastName: lastname
      }
    }
  }
`
