import type { AstraAPI, Provider } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import login from './login'
import logout from './logout'
import signup from './signup'
import customer from './customer'

// import products from './catalog/products'

const endpoints = {
  cart,
  login,
  logout,
  signup,
  customer,
}

export default function astraAPI(commerce: AstraAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
