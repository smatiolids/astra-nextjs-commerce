import { Product } from '@vercel/commerce/types/product'
import { GetSiteInfoOperation } from '@vercel/commerce/types/site'

export function normalizeSearchResult(items: any[]): Product[] {
  return items
    .filter((item) => item.kind === 'root')
    .map((item) => {
      return {
        id: item.product_id,
        name: item.name,
        description: item.description,
        descriptionHtml: item.descriptionHtml,
        slug: item.slug,
        path: `/${item.slug}`,
        images: item.images || [],
        sku: item.sku || null,
        vendor: item.vendor || null,
        // variants: [],
        variants: items
          .filter((v) => v.kind === 'variant' && v.productId === item.productId)
          .map((v) => {
            return {
              id: v.id,
              name: v.name,
              sku: v.sku || null,
              options: v.options,
            }
          }),
        price: {
          value: parseFloat(item.price.value),
          currencyCode: item.price.currencycode,
        },
        options: item.options,
      }
    })
}

export function normalizeSiteInfoResult(items: any[]): any[] {
  return items.map((item) => {
    return {
      ...item,
      path: `/${item.slug}`,
    }
  })
}
