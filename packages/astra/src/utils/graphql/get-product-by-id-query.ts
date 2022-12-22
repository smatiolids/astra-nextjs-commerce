import { productResultFragment } from './product-fragment'

export const getProductByIdQuery = /* GraphQL */ `
  query getProductById($productId: Uuid!) {
    products(
      options: { pageSize: 10 }
      filter: { productid: { eq: $productId } }
    ) {
      values {
        ...ProductResult
      }
    }
  }
  ${productResultFragment}
`
