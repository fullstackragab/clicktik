import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CategoriesComponent } from '../../components/categories/categories.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    ProductCardComponent,
    PaginatorComponent,
    BreadcrumbComponent,
    CategoriesComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  limit = 3;
  skip = 1;
  total = 10;
  products: any[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService
      .getProducts(this.limit, this.skip)
      .subscribe((response: any) => {
        this.limit = response.limit;
        this.skip = response.skip;
        this.total = response.total;
        this.products = response.products;
      });
  }

  onPaginate(page: number) {
    this.skip = this.limit * page;
    this.getProducts();
  }
}
