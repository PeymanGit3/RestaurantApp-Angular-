export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  spiciness: number;
  vegeterian: boolean;
  rate: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: CartProduct;
}

export interface Cart {
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
}

export interface CartResponse {
  data: Cart;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface EditQuantityRequest {
  itemId: number;
  quantity: number;
}