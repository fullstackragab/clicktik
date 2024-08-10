import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ProductCardComponent, PaginatorComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  limit = 10;
  skip = 0;
  total = 0;
  products: any[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService
      .getProducts(this.limit, this.skip)
      .subscribe((products: any) => {
        this.products = products;
      });
  }
}
