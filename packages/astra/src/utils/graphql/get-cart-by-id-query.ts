import { cartResultFragment } from './cart-fragment'

export const getCartByIdQuery = /* GraphQL */ `
  query getCartById($cartId: Uuid!) {
    cart: carts(
      options: { pageSize: 100 }
      filter: { cartid: { eq: $cartId } }
    ) {
      values {
        ...CartResult
      }
    }
  }
  ${cartResultFragment}
`
