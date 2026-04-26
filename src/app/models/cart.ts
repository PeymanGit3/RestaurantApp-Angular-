export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface EditQuantityRequest {
  itemId: number;
  quantity: number;
}