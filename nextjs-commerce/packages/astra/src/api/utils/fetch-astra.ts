import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { AstraConfig } from '../index'

const fetchGraphqlApi: (getConfig: () => AstraConfig) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, headers?: HeadersInit) => {
    const config = getConfig()
    const res = await fetch(config.commerceUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'x-cassandra-token': config.apiToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
