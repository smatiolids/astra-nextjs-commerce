export const removeCartMutation = /* GraphQL */ `
  mutation removeCart($cartId: Uuid) {
    cart: deletecart(value: { id: $cartId }) {
      value {
        id
      }
    }
  }
`
