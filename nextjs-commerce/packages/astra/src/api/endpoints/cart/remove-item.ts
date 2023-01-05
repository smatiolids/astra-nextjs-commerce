import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'
import getCartCookie from '../../../api/utils/get-cart-cookie'
import { removeItemFromCartMutation } from '../../../utils/graphql/del-cart-item'
import { getCartByIdQuery } from '../../../utils/graphql/get-cart-by-id-query'
import { updateCartTotalMutation } from '../../../utils/graphql/upd-cart-total'
import { normalizeCartResult } from '../../../utils/normalize/normalizeCartResult'
import type { CartEndpoint } from '.'
import { removeCartMutation } from '../../../utils/graphql/del-cart'

// import { normalizeCart } from '../../../lib/normalize'
// import getCartCookie from '../../utils/get-cart-cookie'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  body: { cartId, itemId },
  config,
}) => {
  const { data: deletedItem } = await config.fetch(removeItemFromCartMutation, {
    variables: {
      cartId,
      itemId,
    },
  })

  const { data: cart } = await config.fetch(getCartByIdQuery, {
    variables: {
      cartId,
    },
  })

  if (!cart.cart.values) return null

  const cartUpdated = normalizeCartResult(cart.cart.values)

  if (!cartUpdated.lineItemsSubtotalPrice) {
    // If no items on cart, removes the cart itself
    const { data: deletedCart } = await config.fetch(removeCartMutation, {
      variables: {
        cartId,
      },
    })
    return {
      data: cartUpdated,
      headers: {
        'Set-Cookie': getCartCookie(config.cartCookie),
      },
    }
  }

  const { data: totalCart } = await config.fetch(updateCartTotalMutation, {
    variables: {
      cartId,
      lineItemsSubtotalPrice: cartUpdated.lineItemsSubtotalPrice,
    },
  })

  if (
    cartUpdated.lineItemsSubtotalPrice !==
    parseFloat(totalCart.cart.value.lineitemssubtotalprice)
  )
    throw new CommerceAPIError('Error on removing item')

  return {
    data: cartUpdated,
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        cartId,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default removeItem
