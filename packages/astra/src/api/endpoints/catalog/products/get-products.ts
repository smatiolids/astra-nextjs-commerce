import { Product } from '@vercel/commerce/types/product'
import { ProductsEndpoint } from '.'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body: { search, categoryId, brandId, sort },
}) => {
  console.log('get Products endpoint', search, categoryId, brandId, sort)
  return { data: { products: [], found: false } }
}

export default getProducts
