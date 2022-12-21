import { Cart } from '@vercel/commerce/types/cart'

export function normalizeCartResult(item: any): Cart[] {
  return {
    id: item.id,
    customerId: item.customerId,
    url: item.url || null,
    email: item.email || null,
    createdAt: item.createdAt || new Date().toISOString(),
    currency: { code: item.currency || 'BRL' },
    taxesIncluded: item.taxesIncluded || false,
    lineItems: [
      {
        id: item.id,
        variantId: item.variantId,
        productId: item.productId,
        name: item.name,
        quantity: parseFloat(item.quantity),
        discounts: item.discount,
        path: item.path,
        options: item.options,
        variant: {
          id: item.variantId,
          name: 'name',
          price: parseFloat(item.subtotalPrice) || 0,
          listPrice: parseFloat(item.subtotalPrice) || 0,
          image: {
            url: 'image_url',
          },
        },
      },
    ],
    lineItemsSubtotalPrice: parseFloat(item.lineItemsSubtotalPrice) || 1,
    subtotalPrice: parseFloat(item.subtotalPrice) || 1,
    totalPrice: parseFloat(item.totalPrice) || 0,
    discounts: item.discounts || [],
  }
}
