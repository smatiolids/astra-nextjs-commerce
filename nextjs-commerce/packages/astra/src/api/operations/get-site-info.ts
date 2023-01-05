import { OperationContext } from '@vercel/commerce/api/operations'
import { Category, GetSiteInfoOperation } from '@vercel/commerce/types/site'
import { normalizeSiteInfoResult } from '../../utils/normalize/normalizeSearchResult'
import { getSiteInfoQuery } from '../../utils/graphql/get-site-info'
import { AstraConfig } from '../index'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<any>) {
  async function getSiteInfo(opts?: {
    url: 'get-site-info'
    variables?: any
    config?: Partial<AstraConfig>
    preview?: boolean
  }): Promise<GetSiteInfoResult>

  async function getSiteInfo({
    query = getSiteInfoQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<AstraConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch(query)

    return Promise.resolve({
      categories: normalizeSiteInfoResult(data.categories.values),
      brands: normalizeSiteInfoResult(data.brands.values),
    })
  }

  return getSiteInfo
}
