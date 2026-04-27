export interface Category {
  id: number;
  name: string;
  canDelete?: boolean;
}

export interface CategoryResponse {
  data: Category[];
  meta: any;
}