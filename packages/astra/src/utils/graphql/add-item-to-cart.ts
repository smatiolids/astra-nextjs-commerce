// import { productResultFragment } from './product-fragment'

import { cartResultFragment } from './cart-fragment'

export const addItemToCartMutation = /* GraphQL */ `
  mutation createCart(
    $cartId: Uuid
    $itemId: Uuid
    $customerId: Uuid
    $productId: Uuid
    $variantId: Uuid
    $url: String
    $email: String
    $currency: String
    $createdAt: Timestamp
    $subtotalPrice: Decimal
    $totalPrice: Decimal
    $name: String
    $quantity: Decimal
  ) {
    cart: insertcarts(
      value: {
        cartid: $cartId
        itemid: $itemId
        variantid: $variantId
        url: $url
        email: $email
        currency: $currency
        createdat: $createdAt
        customerid: $customerId
        productid: $productId
        subtotalprice: $subtotalPrice
        totalprice: $totalPrice
        name: $name
        quantity: $quantity
      }
    ) {
      value {
        ...CartResult
      }
    }
  }
  ${cartResultFragment}
`
