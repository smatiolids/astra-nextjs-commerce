import { productResultFragment } from './product-fragment'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($category: String, $brand: String) {
    products(
      options: { pageSize: 10 }
      filter: { category: { eq: $category }, brand: { eq: $brand } }
    ) {
      values {
        ...ProductResult
      }
    }
  }
  ${productResultFragment}
`
