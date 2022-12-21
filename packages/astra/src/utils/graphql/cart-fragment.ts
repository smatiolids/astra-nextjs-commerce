export const cartResultFragment = /* GraphQL */ `
  fragment CartResult on cart {
    id
    itemid
    customerId: customerid
    productId: productid
    variantId: variantid
    currency
    url
    email
    createdAt: createdat
    subtotalPrice: subtotalprice
    totalPrice: totalprice
    name
    quantity
  }
`
