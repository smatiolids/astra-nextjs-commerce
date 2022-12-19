import { Product } from '@vercel/commerce/types/product'
import { Provider, AstraConfig } from '../'
import { OperationContext } from '@vercel/commerce/api/operations'
import { getAllProductsQuery } from '../../utils/queries/get-all-products-query'
import { normalizeSearchResult } from '../../utils/normalize'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts(opts?: {
    variables?: ProductVariables
    config?: Partial<AstraConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    query = getAllProductsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: ProductVariables
    config?: Partial<AstraConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const config = commerce.getConfig(cfg)
    // const variables = {
    //   input: {
    //     take: vars.first,
    //     groupByProduct: true,
    //   },
    // }
    const { data } = await config.fetch(query, {
      //  variables,
    })

    console.log('data', normalizeSearchResult(data.products.values))

    return {
      products: normalizeSearchResult(data.products.values),
    }
  }

  return getAllProducts
}
