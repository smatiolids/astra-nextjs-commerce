import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { Product } from '@vercel/commerce/types/product'
// import { normalizeSearchResult } from '../utils/normalize'
// import { SearchQuery, SearchQueryVariables } from '../../schema'
// import { searchQuery } from '../utils/queries/search-query'
import type { SearchProductsHook } from '@vercel/commerce/types/product'
import { getAllProductsQuery } from '../utils/graphql/get-all-products-query'
import { normalizeSearchResult } from '../utils/normalize/normalizeSearchResult'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    /**
     * TO-DO
     * - Implement search by feature
     */

    const variables = {
      ...(input.categoryId && { category: input.categoryId }),
      ...(input.brandId && { brand: input.brandId }),
    }

    const data = await fetch<any>({
      query: getAllProductsQuery,
      variables,
    })

    if (!data)
      return {
        data: {
          found: false,
          products: [],
        },
      }

    return {
      found: data.products.values.length > 0,
      products: normalizeSearchResult(data.products.values),
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}