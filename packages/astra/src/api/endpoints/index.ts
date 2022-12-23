import type { AstraAPI, Provider } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import products from './catalog/products'

const endpoints = {
  cart,
}

export default function astraAPI(commerce: AstraAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
