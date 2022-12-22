import getCartCookie from '../../../api/utils/get-cart-cookie'
import { normalizeCartResult } from '../../../utils/normalize/normalizeCartResult'
import type { CartEndpoint } from '.'
import { getCartByIdQuery } from '../../../utils/graphql/get-cart-by-id-query'
import { updateItemQtyMutation } from '../../../utils/graphql/upd-item-qty-cart'
import { Cart } from '@vercel/commerce/types'
import { CommerceAPIError } from '@vercel/commerce/api/utils/errors'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  body: { cartId, itemId, item },
  config,
}) => {
  console.log('updateItemupdateItems', cartId, itemId, item)

  const { data: cart } = await config.fetch(getCartByIdQuery, {
    variables: {
      cartId,
    },
  })

  if (!cart.cart.values) return null

  const itemUpd = cart.cart.values.find(
    (i) => i.id === cartId && i.itemId === itemId
  )
  itemUpd.quantity = item.quantity

  const cartUpdated = normalizeCartResult(cart.cart.values)

  const { data: updQty } = await config.fetch(updateItemQtyMutation, {
    variables: {
      cartId,
      itemId,
      quantity: item.quantity?.toString(),
      lineItemsSubtotalPrice: cartUpdated.lineItemsSubtotalPrice.toString(),
    },
  })

  if (
    cartUpdated.lineItemsSubtotalPrice !==
    parseFloat(updQty.cart.value.lineitemssubtotalprice)
  )
    throw new CommerceAPIError('Error on updating quantity')

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

export default updateItem
