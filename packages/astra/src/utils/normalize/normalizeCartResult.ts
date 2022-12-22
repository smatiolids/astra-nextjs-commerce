import { Cart } from '@vercel/commerce/types/cart'

export function normalizeCartResult(items: any[]): Cart {
  return {
    id: items[0].cartId,
    customerId: items[0].customerId,
    url: items[0].url || null,
    email: items[0].email || null,
    createdAt: items[0].createdAt || new Date().toISOString(),
    currency: { code: items[0].currency || 'BRL' },
    taxesIncluded: items[0].taxesIncluded || false,
    lineItems: items.map((item) => ({
      id: item.itemId,
      variantId: item.variantId,
      productId: item.productId,
      name: item.name,
      quantity: parseFloat(item.quantity),
      subtotalPrice: parseFloat(item.totalPrice) || 1,
      totalPrice: parseFloat(item.totalPrice) || 0,
      discounts: [],
      path: item.path,
      options: item.options,
      variant: {
        id: item.variantId,
        name: item.name,
        price: parseFloat(item.totalPrice) || 0,
        listPrice: parseFloat(item.totalPrice) || 0,
        image: {
          url: 'image_url',
        },
      },
    })),
    lineItemsSubtotalPrice: items.reduce((acc, item) => {
      acc += parseFloat(item.totalPrice) * parseFloat(item.quantity)
      return acc
    }, 0),
    subtotalPrice: items.reduce((acc, item) => {
      acc += parseFloat(item.totalPrice) * parseFloat(item.quantity)
      return acc
    }, 0),
    totalPrice: items.reduce((acc, item) => {
      acc += parseFloat(item.totalPrice) * parseFloat(item.quantity)
      return acc
    }, 0),
    discounts: [],
  }
}
