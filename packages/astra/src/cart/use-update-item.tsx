import { MutationHook } from '@vercel/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import debounce from 'lodash.debounce'
import type { LineItem, UpdateItemHook } from '@vercel/commerce/types/cart'

import useCart from './use-cart'
import { useCallback } from 'react'
import { ValidationError } from '@vercel/commerce/utils/errors'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/commerce/cart',
    method: 'PUT',
  },
  async fetcher({ input: { itemId, item }, options, fetch }) {
    console.log('fetcher', itemId, item, options)
    const data = await fetch({
      ...options,
      body: { itemId, item },
    })

    return data
  },
  useHook:
    ({ fetch }) =>
    (
      ctx: {
        item?: any
        wait?: number
      } = {}
    ) => {
      const { item } = ctx
      const { mutate } = useCart() as any

      console.log('update hook', item)
      return useCallback(
        debounce(async (input: any) => {
          const itemId = input.id ?? item?.id
          const productId = input.productId ?? item?.productId
          const variantId = input.productId ?? item?.variantId

          if (!itemId || !productId || !variantId) {
            throw new ValidationError({
              message: 'Invalid input used for this operation',
            })
          }

          const data = await fetch({
            input: {
              itemId,
              item: { productId, variantId, quantity: input.quantity },
            },
          })
          await mutate(data, false)
          return data
        }, ctx.wait ?? 500),
        [fetch, mutate]
      )
    },
}
