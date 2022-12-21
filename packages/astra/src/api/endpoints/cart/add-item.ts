import { addItemToCartMutation } from '../../../utils/graphql/add-item-to-cart'
import type { CartEndpoint } from '.'
import { v4 as uuidv4 } from 'uuid'
import getCartCookie from '../../utils/get-cart-cookie'
import { normalizeCartResult } from '../../../utils/normalize/normalizeCartResult'
import { getProductByIdQuery } from '../../../utils/graphql/get-product-by-id-query'
import { Product } from '@vercel/commerce/types'
import { normalizeSearchResult } from '../../../utils/normalize/normalizeSearchResult'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  body: { cartId, item },
  config,
}) => {
  const { data: prod } = await config.fetch(getProductByIdQuery, {
    variables: {
      product_id: item.productId,
    },
  })

  const product = <Product>normalizeSearchResult(prod.products.values)[0]

  console.log('product', product)

  const variables = {
    id: cartId || uuidv4(),
    itemId: uuidv4(),
    customerId: uuidv4(),
    productId: item.productId,
    variantId: item.productId,
    quantity: item?.quantity?.toString() ?? 1,
    url: `/${cartId}`,
    email: `none`,
    createdAt: cartId ? null : new Date().toISOString(),
    totalPrice: product.price.value.toString(),
    currency: product.price.currencyCode || 'USD',
    name: product.name,
  }

  const { data } = await config.fetch(addItemToCartMutation, {
    variables,
  })

  console.log('data norm', normalizeCartResult(data.cart.value))

  return {
    data: normalizeCartResult(data.cart.value),
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        data.cart.value.id,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default addItem
