// Centralized Payment type definitions
export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: string;
  bank?: string;
  status: string;
  transactionId: string; // Required for PaymentReceipt component
  verificationCode?: string;
  paidAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payments: Payment[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

// PaymentReceipt component props type
export interface PaymentReceiptProps {
  payment: {
    id: number;
    transactionId: string;
    amount: number;
    method: string;
    bank?: string;
    status: string;
    paidAt?: string;
    createdAt: string;
  };
  order: {
    id: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: Array<{
      id: number;
      productId: number;
      quantity: number;
      price: number;
      product: {
        id: number;
        name: string;
        price: number;
        image: string;
      };
    }>;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
} 