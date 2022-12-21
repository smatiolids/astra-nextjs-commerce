import { productResultFragment } from './product-fragment'

export const getSiteInfoQuery = /* GraphQL */ `
  query getSiteInfo {
    categories: site_info(
      options: { pageSize: 10 }
      filter: { kind: { eq: "category" } }
    ) {
      values {
        name
        id
        slug
      }
    }
    brands: site_info(
      options: { pageSize: 10 }
      filter: { kind: { eq: "brand" } }
    ) {
      values {
        name
        id
        slug
      }
    }
  }
`
