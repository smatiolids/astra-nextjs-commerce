import { productResultFragment } from './product-fragment'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts {
    products(options: { pageSize: 10 }) {
      values {
        ...ProductResult
      }
    }
  }
  ${productResultFragment}
`
