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
      productId: item.productId,
    },
  })

  const product = normalizeSearchResult(prod.products.values)[0]

  const variables = {
    cartId: cartId || uuidv4(),
    itemId: uuidv4(),
    customerId: uuidv4(),
    productId: item.productId,
    variantId: item.productId,
    quantity: item?.quantity?.toString() ?? 1,
    url: `/${cartId}`,
    path: `/${product.slug}`,
    imageUrl: product.images.length > 0 ? product.images[0].url : null,
    email: `none`,
    totalPrice: product.price.value.toString(),
    currency: product.price.currencyCode || 'USD',
    name: product.name,
    ...(!cartId && { createdAt: new Date().toISOString() }),
  }

  console.log('variables', variables)
  const { data } = await config.fetch(addItemToCartMutation, {
    variables,
  })

  return {
    data: data.cart.values ? normalizeCartResult(data.cart.values) : null,
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        variables.cartId,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default addItem
