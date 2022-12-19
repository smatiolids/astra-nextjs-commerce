export const productResultFragment = /* GraphQL */ `
  fragment ProductResult on products {
    product_id
    kind
    id
    name
    description
    descriptionHtml: description
    slug
    vendor
    images {
      url
    }
    price {
      value
      currencycode
    }
    options {
      __typename: typename
      id
      displayName: displayname
      values {
        label
        hexColors: hexcolors
      }
    }
  }
`
