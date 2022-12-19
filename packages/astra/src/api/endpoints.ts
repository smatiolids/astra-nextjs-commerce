import createEndpoints from '@vercel/commerce/api/endpoints'
import type { AstraAPI } from '.'

const endpoints = {}

export default function astraAPI(commerce: AstraAPI) {
  return createEndpoints(commerce, endpoints)
}
