import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFirestore) { }
  create(product){
    return this.db.collection('/products').add(product);
  }

  getAll():Observable<any[]>{
    return this.db.collection('/products').snapshotChanges().pipe(
      map(changes => changes.map(({ payload: { doc } }) => {
        const data = doc.data();
        const id = doc.id;
        return { id, data };
      })));
    
  }

  get(productId){
    return this.db.doc('/products/'+productId).valueChanges();
  }

  update(productId,product){
    return this.db.doc('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.doc('/products/'+productId).delete();
  }
}
