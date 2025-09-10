export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  ingredients: string[];
  size?: 'small' | 'medium' | 'large';
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  pickupTime?: string;
  orderType: 'delivery' | 'pickup';
  createdAt: Date;
}

export interface OrderItem {
  pizzaId: string;
  pizzaName: string;
  quantity: number;
  price: number;
  size?: 'small' | 'medium' | 'large';
}
