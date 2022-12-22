export const cartResultFragment = /* GraphQL */ `
  fragment CartResult on cart {
    id
    itemId: itemid
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
