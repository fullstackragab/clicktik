import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { UtilsService } from '../../services/utils.service';
import { RatingComponent } from '../rating/rating.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RatingComponent, TruncatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private readonly utilsService: UtilsService,
    private cartService: CartService
  ) {}

  calcNewPrice() {
    return this.utilsService.roundNumber(
      this.product.price -
        (this.product.price * this.product.discountPercentage) / 100
    );
  }

  onAddProductToCart() {
    this.cartService.addItem({
      id: this.product.id,
      name: this.product.title,
      imageUrl: this.product.thumbnail,
      price: this.calcNewPrice(),
      quantity: 1,
    });
  }
}
