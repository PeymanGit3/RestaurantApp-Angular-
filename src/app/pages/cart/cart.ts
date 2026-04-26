import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { Cart, CartItem } from '../../models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], totalAmount: 0 };
  isLoading = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.editQuantity({ itemId: item.id, quantity: item.quantity + 1 }).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity === 1) {
      this.removeItem(item.id);
      return;
    }
    this.cartService.editQuantity({ itemId: item.id, quantity: item.quantity - 1 }).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  checkout(): void {
    this.cartService.checkout().subscribe({
      next: () => {
        alert('Siparişiniz alındı!');
        this.router.navigate(['/products']);
      },
      error: (err) => console.error(err)
    });
  }
}