import { type GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import cartEndpoint from '@vercel/commerce/api/endpoints/cart'
import type { CartSchema } from '@vercel/commerce/types/cart'
import type { AstraAPI } from '../..'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CartAPI = GetAPISchema<AstraAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
  updateItem,
  removeItem,
}

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi
