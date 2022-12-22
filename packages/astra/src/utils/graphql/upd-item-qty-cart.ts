// import { productResultFragment } from './product-fragment'

import { cartResultFragment } from './cart-fragment'

export const updateItemQtyMutation = /* GraphQL */ `
  mutation updateItemQtyCart(
    $cartId: Uuid
    $itemId: Uuid
    $quantity: Decimal
    $lineItemsSubtotalPrice: Decimal
  ) {
    cart: updatecarts(
      value: {
        cartid: $cartId
        itemid: $itemId
        quantity: $quantity
        lineitemssubtotalprice: $lineItemsSubtotalPrice
      }
    ) {
      value {
        cartId: cartid
        itemId: itemid
        quantity
        lineItemsSubtotalPrice: lineitemssubtotalprice
      }
    }
  }
`
