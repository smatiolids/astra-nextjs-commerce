import type { CommerceAPI, CommerceAPIConfig } from '@vercel/commerce/api'
import { getCommerceApi as commerceApi } from '@vercel/commerce/api'
import createFetcher from './utils/fetch-astra'

import type { CartAPI } from './endpoints/cart'
import type { ProductsAPI } from './endpoints/catalog/products'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface AstraConfig extends CommerceAPIConfig {}

const config: AstraConfig = {
  commerceUrl: `https://${process.env.ASTRA_DB_ID}-${process.env.ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${process.env.ASTRA_DB_KEYSPACE}`,
  apiToken: `${process.env.ASTRA_DB_TOKEN}`,
  customerCookie: 'astra_cust_cartId',
  cartCookie: 'astra_cartId',
  cartCookieMaxAge: 60 * 60 * 24,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider

export type APIs = CartAPI | ProductsAPI

export type AstraAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): AstraAPI<P> {
  return commerceApi(customProvider as any)
}
