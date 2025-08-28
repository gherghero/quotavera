export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  est_value_eur: number;
  target_activations: number;
  activations_count: number;
  status: 'open' | 'closed';
  cover_url: string;
  gallery: string[];
  description: string;
  eta_low_days: number;
  eta_high_days: number;
}

export interface Package {
  id: string;
  product_id: string;
  package_key: 'base' | 'smart' | 'plus';
  entries: number;
  price_eur: number;
}

export interface Order {
  id: string;
  product_id: string;
  package_key: 'base' | 'smart' | 'plus';
  entries: number;
  amount_eur: number;
  status: 'pending' | 'paid' | 'failed';
  email?: string;
  client_id: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  order_id: string;
  product_id: string;
  serial: string;
  qr_url: string;
  asset_url: string;
  created_at: string;
}

// Helper type for joining tickets with products
export type TicketWithProduct = Ticket & {
  products: {
    name: string;
    cover_url: string;
  } | null;
};
