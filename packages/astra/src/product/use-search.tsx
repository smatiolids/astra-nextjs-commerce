import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { Product } from '@vercel/commerce/types/product'
// import { normalizeSearchResult } from '../utils/normalize'
// import { SearchQuery, SearchQueryVariables } from '../../schema'
// import { searchQuery } from '../utils/queries/search-query'
import type { SearchProductsHook } from '@vercel/commerce/types/product'
import { getAllProductsQuery } from '../utils/queries/get-all-products-query'
import { normalizeSearchResult } from '../utils/normalize'

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
    console.log('search input', input)
    const { categoryId, brandId } = input

    // const variables: SearchQueryVariables = {
    //   input: {
    //     term: input.search,
    //     collectionId: input.categoryId?.toString(),
    //     groupByProduct: true,
    //     // TODO: what is the "sort" value?
    //   },
    // }
    const { data } = await fetch<any>({
      query: getAllProductsQuery,
    })

    console.log('res search ', data)
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
