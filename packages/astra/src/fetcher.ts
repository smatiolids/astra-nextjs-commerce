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
  const astraApiUrl = `${url}?${params ? objToQueryString(params) : ''}`
  const hasGraphQL = Boolean(variables || query)
  const body = hasGraphQL
    ? JSON.stringify({ query, variables })
    : bodyObj
    ? JSON.stringify(bodyObj)
    : undefined

  console.log('fetcher', url, method, hasGraphQL, body)
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

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
    console.log('fetcher', data)
    return data
  }

  throw await getError(res)
}
