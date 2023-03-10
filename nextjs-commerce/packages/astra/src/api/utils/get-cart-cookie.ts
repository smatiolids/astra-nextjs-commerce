import { serialize, CookieSerializeOptions } from 'cookie'

export default function getCartCookie(
  name: string,
  cartId?: string,
  maxAge?: number
) {
  const options: CookieSerializeOptions =
    cartId && maxAge
      ? {
          maxAge,
          expires: new Date(Date.now() + maxAge * 1000),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        }
      : {
          maxAge: -1,
        } // Removes the cookie

  return serialize(name, cartId || '', options)
}
