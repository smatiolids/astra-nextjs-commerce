// import { productResultFragment } from './product-fragment'

import { cartResultFragment } from './cart-fragment'

export const updateCartTotalMutation = /* GraphQL */ `
  mutation updateCartTotal($cartId: Uuid, $lineItemsSubtotalPrice: Decimal) {
    cart: updatecart(
      value: { id: $cartId, lineitemssubtotalprice: $lineItemsSubtotalPrice }
    ) {
      value {
        id
        lineitemssubtotalprice
      }
    }
  }
`
