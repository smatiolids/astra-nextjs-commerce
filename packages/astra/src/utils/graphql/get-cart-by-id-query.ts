import { cartResultFragment } from './cart-fragment'

export const getCartByIdQuery = /* GraphQL */ `
  query getCartById($cartId: Uuid!) {
    cart(options: { pageSize: 100 }, filter: { id: { eq: $cartId } }) {
      values {
        ...CartResult
      }
    }
  }
  ${cartResultFragment}
`
