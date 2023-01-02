export const addCustomer = /* GraphQL */ `
  mutation createCustomer(
    $email: String
    $customerId: Uuid
    $firstName: String
    $lastName: String
    $password: String
  ) {
    customer: insertcustomers(
      value: {
        email: $email
        customerid: $customerId
        firstname: $firstName
        lastname: $lastName
        password: $password
      }
    ) {
      value {
        customerId: customerid
        firstName: firstname
        lastName: lastname
        email
      }
    }
  }
`
