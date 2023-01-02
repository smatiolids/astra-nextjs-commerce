import type { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  type UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import type { CustomerHook } from '@vercel/commerce/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: '/api/commerce/customer',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    console.log('useCustomer fetcher options', options)
    const data = await fetch(options)
    console.log('useCustomer fetcher', options, data)

    return data ? { customer: data } : null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      console.log('useCustomer input', input)
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
