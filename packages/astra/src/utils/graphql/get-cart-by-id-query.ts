import { cartResultFragment } from './cart-fragment'

export const getCartByIdQuery = /* GraphQL */ `
  query getCartById($cartId: Uuid!) {
    cart(options: { pageSize: 1 }, filter: { id: { eq: $cartId } }) {
      values {
        ...CartResult
      }
    }
  }
  ${cartResultFragment}
`
