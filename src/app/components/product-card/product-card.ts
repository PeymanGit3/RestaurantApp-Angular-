import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<number>();

  onAddToCart(): void {
    this.addToCart.emit(this.product.id);
  }

  getSpiciness(): string {
    return '🌶️'.repeat(this.product.spiciness);
  }
}