import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { first } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ProductCardComponent,
    PaginatorComponent,
    BreadcrumbComponent,
    CategoriesComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  limit = 9;
  skip = 0;
  total = 0;
  q: string = '';
  category: string = '';
  products: any[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private readonly searchService: SearchService,
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.filterService.filter.subscribe((category) => {
      this.category = category;
      this.getProductsByCategory();
    });
    this.searchService.term.subscribe((q: any) => {
      this.q = q;
      this.searchProducts();
    });
  }

  searchProducts() {
    this.productsService
      .searchProducts(this.q)
      .pipe(first())
      .subscribe((response: any) => {
        this.limit = response.limit;
        this.skip = response.skip;
        this.total = response.total;
        this.products = response.products;
      });
  }

  getProductsByCategory() {
    this.productsService
      .getProductsByCategory(this.category)
      .subscribe((response: any) => {
        //this.limit = response.limit;
        this.skip = response.skip;
        this.total = response.total;
        this.products = response.products;
      });
  }

  onPaginate(page: number) {
    this.skip = this.limit * page;
    this.searchProducts();
  }
}
