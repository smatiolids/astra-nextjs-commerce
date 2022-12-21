import type { AstraConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'
import data from '../../data.json'
import type { OperationContext } from '@vercel/commerce/api/operations'
import { getProductBySlugQuery } from '../../utils/graphql/get-product-by-slug-query'
import { normalizeSearchResult } from '../../utils/normalize/normalizeSearchResult'

export type ProductVariables = { slug?: string }

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct(opts?: {
    variables?: ProductVariables
    config?: Partial<AstraConfig>
    preview?: boolean
  }): Promise<Product>

  async function getProduct<T extends GetProductOperation>({
    query = getProductBySlugQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<AstraConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch(query, {
      variables,
    })
    return {
      product: <Product>normalizeSearchResult(data.products.values)[0],
    }
  }

  return getProduct
}
