// import { productResultFragment } from './product-fragment'

import { cartResultFragment } from './cart-fragment'

export const updateItemQtyMutation = /* GraphQL */ `
  mutation updateItemQtyCart(
    $cartId: Uuid
    $itemId: Uuid
    $quantity: Decimal
    $lineItemsSubtotalPrice: Decimal
  ) {
    cart: updatecart(
      value: {
        id: $cartId
        itemid: $itemId
        quantity: $quantity
        lineitemssubtotalprice: $lineItemsSubtotalPrice
      }
    ) {
      value {
        id
        itemid
        quantity
        lineitemssubtotalprice
      }
    }
  }
`
