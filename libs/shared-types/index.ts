// API contract shared between the portal's pages and its API routes.
// Shapes match the rows returned by apps/fernforest-portal/lib/server.

export interface NewLead {
  name: string;
  phone?: string;
  email?: string;
}

export interface Lead extends NewLead {
  id: number;
  createdAt: string;
}

export interface NewOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface OrderItem extends NewOrderItem {
  id: number;
  orderId?: number;
}

export interface NewOrder {
  name: string;
  phone: string;
  address: string;
  notes?: string;
  total: number;
  items: NewOrderItem[];
}

export interface Order extends Omit<NewOrder, "items"> {
  id: number;
  createdAt: string;
  items: OrderItem[];
}

/** Body of POST /api/orders. `saveAddress` only applies to signed-in customers. */
export interface OrderRequest extends NewOrder {
  saveAddress?: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
}

export interface ProfileUpdate {
  name?: string;
  phone?: string | null;
}

export interface NewAddress {
  label?: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
}

export interface Address extends Required<NewAddress> {
  id: number;
  createdAt: string;
}
