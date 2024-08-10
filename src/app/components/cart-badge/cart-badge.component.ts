import { Component, computed, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart-badge.component.html',
  styleUrl: './cart-badge.component.css',
})
export class CartBadgeComponent implements OnInit {
  total = computed(() => this.cartService.cart().total);
  count = computed(() => this.cartService.cart().count);

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {}
}
