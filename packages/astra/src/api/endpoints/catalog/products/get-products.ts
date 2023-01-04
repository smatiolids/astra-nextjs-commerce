import { Product } from '@vercel/commerce/types/product'
import { ProductsEndpoint } from '.'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body,
  config,
  commerce,
}) => {
  console.log('get Products endpoint', body)
  return { data: { products: [], found: false } }
}

export default getProducts
