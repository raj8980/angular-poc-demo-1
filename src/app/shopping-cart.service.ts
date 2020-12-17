import { product } from './models/products';
import { Injectable, Pipe } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {take} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ɵDomAdapter } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products:any={};
  constructor(private db: AngularFirestore) {}

  private create(){
   return this.db.collection('/shopping-carts').add({
      dateCreated:new Date().getTime()
    });
  }

  async getCart(){
    let cartId:String=await this.getOrCreateCart();
    console.log(cartId);
     const productsDoc=this.db.doc('/shopping-carts/'+cartId);
     return productsDoc.snapshotChanges()
     .pipe(
       map(changes => {
         const data = changes.payload.data();
         const id = changes.payload.id;
        
         return { id, data };
       }));
     
  }

   async getOrCreateCart():Promise<String>{
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result=await this.create();
      localStorage.setItem('cartId',result.id);
      return result.id;
  }

  private getItem(cartId:String,productId:String){
      return this.db.doc("/shopping-carts/"+cartId+"/items/"+productId);
  }
  getItemQuantity(cartId:String,productId:String){
      let quantity;
      let item$=this.getItem(cartId,productId);
      
      item$.ref.get().then(function(doc){
        if(doc.exists){
            quantity=doc.data()['quantity'];
        }else{
            quantity=0;
        }
      });
      return quantity;
  }

  async addTocart(product){
      let cartId=await this.getOrCreateCart();
      
      let item$=this.getItem(cartId,product.id);
      let quantity=this.getItemQuantity(cartId,product.id);


      item$.snapshotChanges().pipe(take(1)).subscribe(
        (item)=>{
          if(quantity==1){
            item$.set({product:product,quantity:quantity+1}); 
          }else{
            item$.update({quantity : quantity+1});
          }
        }
      );
        
      // }else{
      //   this.db.doc("/shopping-carts/"+cartId+"/items/"+product.id).update({quantity:quantity});
        
      // }
      
     
     
      // item$.snapshotChanges().pipe(take(1)).subscribe((item)=>{
      //   this.products=item;
      //   console.log(this.products.payload;
      //   if(this.products.quantity){
           
      //       console.log("no data"+this.products.quantity);

      //       item$.update({quantity : this.products.quantity+1})
      //   }else{    
      //     console.log("contain data");
      //     item$.set({product:product,quantity:1});
      //   }
      
      // });
      
      
      // subscribe(item=>{
        // if(item.$exists()) item$.update({quantity = item.qunatity  + 1});
        // else item$.set({product:product,quantity:1});

      // });
  }
}
