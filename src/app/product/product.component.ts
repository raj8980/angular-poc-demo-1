import { ShoppingCartService } from './../shopping-cart.service';
import { product } from './../models/products';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map,switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:any[];
  filteredProducts:any[];
  cart:any;
  category;
  subscription: Subscription;
  test1;
test2;test3;test4;
  constructor(
    route:ActivatedRoute,
    productService:ProductService,
    private shoppingCartService:ShoppingCartService
    ) { 
        productService.getAll().pipe(switchMap(products=>{
          this.filteredProducts=this.products=products;
          
          return  route.queryParamMap;
        }))
         .subscribe(params=>{
            this.category=params.get('category');
            if(this.filteredProducts){
              this.filteredProducts=(this.category)?
                this.products.filter((p:{data:product})=>p.data.category.toLowerCase().includes(this.category .toLowerCase())):
                this.products;
            }
            
          });      
    }  
    async ngOnInit(){
      let cartId:String=await this.shoppingCartService.getOrCreateCart();
      console.log("data:"+await this.shoppingCartService.getCart());
    }
}
