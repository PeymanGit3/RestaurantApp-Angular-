export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
  isVegetarian: boolean;
  spiciness: number;
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
  items: Product[];
  totalCount: number;
  page: number;
  take: number;
}