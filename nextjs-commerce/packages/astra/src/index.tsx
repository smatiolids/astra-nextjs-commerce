import {
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@vercel/commerce'
import { astraProvider, AstraProvider } from './provider'

export { astraProvider }
export type { AstraProvider }

export const CommerceProvider = getCommerceProvider(astraProvider)

export const useCommerce = () => useCoreCommerce<AstraProvider>()
