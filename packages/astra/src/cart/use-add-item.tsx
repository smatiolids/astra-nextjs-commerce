import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { CommerceError } from '@vercel/commerce/utils/errors'
import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/commerce/cart',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch({
      ...options,
      body: {
        item: {
          productId: item.productId,
          variantId: item.productId,
          quantity: 1,
        },
      },
    })

    return data
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()
      // console.log('mutate', mutate)
      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
