import { sign } from 'jsonwebtoken'
export function prepareSetCookie(
  name: string,
  value: any,
  options: any = {}
): string {
  // const encodedValue = Buffer.from(value).toString('base64')
  const encodedValue = sign(
    value,
    process.env.AUTH_SECRET || 'ASTRA_AUTH_SECRET'
  )

  const cookieValue = [`${name}=${encodedValue}`]

  if (options.maxAge) {
    cookieValue.push(`Max-Age=${options.maxAge}`)
  }

  if (options.expires && !options.maxAge) {
    cookieValue.push(`Expires=${options.expires.toUTCString()}`)
  }

  const cookie = cookieValue.join('; ')
  return cookie
}
