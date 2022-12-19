import { Fetcher } from '@vercel/commerce/utils/types'
import { FetcherError } from '@vercel/commerce/utils/errors'

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
  variables,
  query,
  body: bodyObj,
}) => {
  const astraApiUrl = `https://${process.env.NEXT_PUBLIC_ASTRA_DB_ID}-${process.env.NEXT_PUBLIC_ASTRA_DB_REGION}.apps.astra.datastax.com/api/graphql/${process.env.NEXT_PUBLIC_ASTRA_DB_KEYSPACE}`

  const hasBody = Boolean(variables || query)
  const body = hasBody ? JSON.stringify({ query, variables }) : undefined
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append(
    'x-cassandra-token',
    process.env.NEXT_PUBLIC_ASTRA_DB_TOKEN || ''
  )

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
    return { data }
  }

  throw await getError(res)
}
