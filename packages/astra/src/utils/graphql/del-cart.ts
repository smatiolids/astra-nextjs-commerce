export const removeCartMutation = /* GraphQL */ `
  mutation removeCart($cartId: Uuid) {
    cart: deletecarts(value: { cartid: $cartId }) {
      value {
        cartId: cartid
      }
    }
  }
`
