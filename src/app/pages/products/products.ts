import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product, ProductFilter } from '../../models/product';
import { Category } from '../../models/category';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isLoading = false;
  totalCount = 0;
  currentPage = 1;
  take = 8;

  filter: ProductFilter = {
    page: 1,
    take: 8
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.filterProducts(this.filter).subscribe({
      next: (data) => {
        this.products = data.items;
        this.totalCount = data.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    this.filter.page = 1;
    this.currentPage = 1;
    this.loadProducts();
  }

  resetFilter(): void {
    this.filter = { page: 1, take: 8 };
    this.currentPage = 1;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.currentPage * this.take < this.totalCount) {
      this.currentPage++;
      this.filter.page = this.currentPage;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.page = this.currentPage;
      this.loadProducts();
    }
  }

  addToCart(productId: number): void {
    this.cartService.addToCart({ productId, quantity: 1 }).subscribe({
      next: () => alert('Ürün sepete eklendi!'),
      error: (err) => alert('Sepete eklemek için giriş yapın!')
    });
  }
}