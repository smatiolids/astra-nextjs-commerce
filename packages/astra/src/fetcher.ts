import { Fetcher } from '@vercel/commerce/utils/types'
import { FetcherError } from '@vercel/commerce/utils/errors'
import { objToQueryString } from './utils/shared'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

export const fetcher: Fetcher = async ({
  url,
  method = 'POST',
  params,
  variables,
  query,
  body: bodyObj,
}) => {
  /**
   * If no url are informed, it is a graphQL to Astra Stargate endpoint
   * If there are a url, it will be redirected to the next.js Api
   */
  const astraApiUrl = url
    ? params
      ? `${url}?${params ? objToQueryString(params) : ''}`
      : url
    : `https://${process.env.NEXT_PUBLIC_ASTRA_DB_ID}-${process.env.NEXT_PUBLIC_ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${process.env.NEXT_PUBLIC_ASTRA_DB_KEYSPACE}`

  const hasGraphQL = Boolean(variables || query)
  const body = hasGraphQL
    ? JSON.stringify({ query, variables })
    : bodyObj
    ? JSON.stringify(bodyObj)
    : undefined

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (!url)
    headers.append('x-cassandra-token', process.env.NEXT_PUBLIC_ASTRA_DB_TOKEN)

  console.log('fetch', astraApiUrl)
  const res = await fetch(`${astraApiUrl}`, {
    method,
    body,
    headers,
  })

  if (res.ok) {
    const { data, errors } = await res.json()

    if (errors) {
      throw new FetcherError({ status: res.status, errors })
    }
    return data
  }

  throw await getError(res)
}
