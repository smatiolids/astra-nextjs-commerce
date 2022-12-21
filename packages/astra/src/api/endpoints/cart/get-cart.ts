import getCartCookie from '../../../api/utils/get-cart-cookie'
import { getCartByIdQuery } from '../../../utils/graphql/get-cart-by-id-query'
import { normalizeCartResult } from '../../../utils/normalize/normalizeCartResult'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  body: { cartId },
  config,
}) => {
  console.log('Backend API get Cart', cartId, config)

  if (cartId) {
    const { data } = await config.fetch(getCartByIdQuery, {
      variables: {
        cartId,
      },
    })

    console.log('data res', data.cart.values[0])

    return {
      data: data.cart.values[0]
        ? normalizeCartResult(data.cart.values[0])
        : null,
      headers: {
        'Set-Cookie': getCartCookie(
          config.cartCookie,
          data.cart.values[0].id,
          config.cartCookieMaxAge
        ),
      },
    }
  }
  return {
    data: null,
  }
}

export default getCart
