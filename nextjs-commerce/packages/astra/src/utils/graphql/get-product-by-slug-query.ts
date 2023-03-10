import { productResultFragment } from './product-fragment'

export const getProductBySlugQuery = /* GraphQL */ `
  query getProductBySlug($slug: String!) {
    products(options: { pageSize: 1 }, filter: { slug: { eq: $slug } }) {
      values {
        ...ProductResult
      }
    }
  }
  ${productResultFragment}
`
