import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { Product } from '@vercel/commerce/types/product'
// import { normalizeSearchResult } from '../utils/normalize'
// import { SearchQuery, SearchQueryVariables } from '../../schema'
// import { searchQuery } from '../utils/queries/search-query'
import type { SearchProductsHook } from '@vercel/commerce/types/product'
import { getAllProductsQuery } from '../utils/graphql/get-all-products-query'
import { normalizeSearchResult } from '../utils/normalize/normalizeSearchResult'
import { objToQueryString } from '../utils/shared'

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
    url: '/api/commerce/catalog/products',
    method: 'GET',
  },
  async fetcher({
    input: { search, categoryId, brandId, sort },
    options,
    fetch,
  }) {
    /**
     * TO-DO
     * - Implement search by feature
     */

    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', search)
    if (Number.isInteger(Number(categoryId)))
      url.searchParams.set('categoryId', String(categoryId))
    if (Number.isInteger(Number(brandId)))
      url.searchParams.set('brandId', String(brandId))
    if (sort) url.searchParams.set('sort', sort)

    const data = await fetch({
      url: url.pathname + url.search,
      method: options.method,
    })

    if (!data)
      return {
        data: {
          found: false,
          products: null,
        },
      }

    return {
      found: false,
      products: [],
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
