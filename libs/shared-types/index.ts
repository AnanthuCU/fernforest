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
