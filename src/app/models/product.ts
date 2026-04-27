export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  spiciness: number;
  vegeterian: boolean;
  rate: number;
  canDelete?: boolean;
}

export interface ProductFilter {
  query?: string;
  vegetarian?: boolean;
  spiciness?: number;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  page?: number;
  take?: number;
}

export interface ProductResponse {
  data: {
    products: Product[];
    totalCount?: number;
  };
}