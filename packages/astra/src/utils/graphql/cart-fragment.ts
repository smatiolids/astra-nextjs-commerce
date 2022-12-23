export const cartResultFragment = /* GraphQL */ `
  fragment CartResult on carts {
    cartId: cartid
    itemId: itemid
    customerId: customerid
    productId: productid
    variantId: variantid
    currency
    url
    email
    path
    imageUrl: imageurl
    createdAt: createdat
    subtotalPrice: subtotalprice
    totalPrice: totalprice
    name
    quantity
  }
`
