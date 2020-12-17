import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input ('product') product;
  @Input ('show-actions') showActions=true;
  @Input  ('shopping-cart') shoppingCart;

  constructor(private cartService:ShoppingCartService) { }
  
  addTocart(product:any[]){
    this.cartService.addTocart(product);
  }

   getQuantity(productId:String){
   
    return 0;
  } 
}
