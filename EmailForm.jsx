// Единая точка доступа к партнёрским ссылкам. Меняйте ссылки только в data/affiliates.json
import links from '../data/affiliates.json'
import { track } from '../services/analytics'

export function affiliateLink(id) {
  return links[id] || '#'
}

export function trackClick(productId, placement) {
  track('Affiliate Click', { product: productId, placement })
}
