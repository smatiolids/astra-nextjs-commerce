// import { productResultFragment } from './product-fragment'

import { cartResultFragment } from './cart-fragment'

export const updateCartTotalMutation = /* GraphQL */ `
  mutation updateCartTotal($cartId: Uuid, $lineItemsSubtotalPrice: Decimal) {
    cart: updatecarts(
      value: {
        cartid: $cartId
        lineitemssubtotalprice: $lineItemsSubtotalPrice
      }
    ) {
      value {
        cartId: cartid
        lineitemssubtotalprice
      }
    }
  }
`
