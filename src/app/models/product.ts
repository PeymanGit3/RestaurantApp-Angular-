export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  spiciness: number;
  vegeterian: boolean;
  vegetarian?: boolean;
  rate: number;
  canDelete?: boolean;
  ingredients?: string[];
  method?: string;
  categoryId?: number;
}

export interface ProductFilter {
  query?: string;
  vegetarian?: boolean;
  spiciness?: number;
  rate?: number;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  page?: number;
  take?: number;
  ingredients?: string[];
  method?: string;
}

export interface ProductResponse {
  data: {
    products: Product[];
    hasMore: boolean;
  };
}