import { productResultFragment } from './product-fragment'

export const getProductByIdQuery = /* GraphQL */ `
  query getProductById($product_id: Uuid!) {
    products(
      options: { pageSize: 1 }
      filter: { product_id: { eq: $product_id } }
    ) {
      values {
        ...ProductResult
      }
    }
  }
  ${productResultFragment}
`
