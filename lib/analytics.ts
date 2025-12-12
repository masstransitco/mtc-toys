import { fbEvent } from '@/app/components/analytics/FacebookPixel'
import { gaEvent } from '@/app/components/analytics/GoogleAnalytics'

interface Product {
  id: string
  name: string
  price: number
  quantity?: number
}

export const analytics = {
  viewContent: (product: Product) => {
    fbEvent('ViewContent', {
      content_type: 'product',
      content_ids: [product.id],
      content_name: product.name,
      value: product.price / 100,
      currency: 'USD',
    })
    gaEvent('view_item', {
      currency: 'USD',
      value: product.price / 100,
      items: [{ item_id: product.id, item_name: product.name, price: product.price / 100 }],
    })
  },

  addToCart: (product: Product, quantity: number) => {
    fbEvent('AddToCart', {
      content_type: 'product',
      content_ids: [product.id],
      content_name: product.name,
      value: (product.price * quantity) / 100,
      currency: 'USD',
    })
    gaEvent('add_to_cart', {
      currency: 'USD',
      value: (product.price * quantity) / 100,
      items: [{ item_id: product.id, item_name: product.name, price: product.price / 100, quantity }],
    })
  },

  initiateCheckout: (items: Product[], total: number) => {
    const contentIds = items.map(i => i.id)
    fbEvent('InitiateCheckout', {
      content_ids: contentIds,
      value: total / 100,
      currency: 'USD',
      num_items: items.length,
    })
    gaEvent('begin_checkout', {
      currency: 'USD',
      value: total / 100,
      items: items.map(i => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price / 100,
        quantity: i.quantity || 1,
      })),
    })
  },

  purchase: (orderId: string, total: number, items: Product[]) => {
    fbEvent('Purchase', {
      content_type: 'product',
      content_ids: items.map(i => i.id),
      value: total / 100,
      currency: 'USD',
    })
    gaEvent('purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: total / 100,
      items: items.map(i => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price / 100,
        quantity: i.quantity || 1,
      })),
    })
  },
}
