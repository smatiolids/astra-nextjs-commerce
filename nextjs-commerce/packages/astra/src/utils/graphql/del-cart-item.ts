export const removeItemFromCartMutation = /* GraphQL */ `
  mutation removeItemFromCart($cartId: Uuid, $itemId: Uuid) {
    cart: deletecarts(value: { cartid: $cartId, itemid: $itemId }) {
      value {
        cartId: cartid
        itemId: itemid
      }
    }
  }
`
