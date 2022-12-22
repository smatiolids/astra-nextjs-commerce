export const removeItemFromCartMutation = /* GraphQL */ `
  mutation removeItemFromCart($cartId: Uuid, $itemId: Uuid) {
    cart: deletecart(value: { id: $cartId, itemid: $itemId }) {
      value {
        id
        itemid
      }
    }
  }
`
