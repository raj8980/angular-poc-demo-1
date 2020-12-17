import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGaurdService } from './admin-auth-gaurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';

import {CustomFormsModule} from 'ng2-validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { CustomCurrencyPipe } from './Pipe/CustomCurrencyPipe';
import { ShoppingCartService } from './shopping-cart.service';

 
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductComponent,
    AdminOrderComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    CustomCurrencyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    CustomFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    
    RouterModule.forRoot([
    { path: '', component: ProductComponent },
    { path: 'products', component: ProductComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'check-out', component: CheckOutComponent
    //, canActivate: [AuthGuardService] 
    },
    { path: 'order-success', component: OrderSuccessComponent
    //, canActivate: [AuthGuardService] 
  },
    { path: 'my/orders', component: MyOrderComponent
    //, canActivate: [AuthGuardService] 
  },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    {
        path: 'admin/products/new',
        component: ProductFormComponent
        //,canActivate: [AdminAuthGaurdService]
    },
    {
        path: 'admin/products/:id',
        component: ProductFormComponent
        //,canActivate: [AdminAuthGaurdService]
    },
    {
        path: 'admin/products',
        component: AdminProductComponent
        //,canActivate: [AdminAuthGaurdService]
    },
    {
        path: 'admin/orders',
        component: AdminOrderComponent
        //,canActivate: [AdminAuthGaurdService]
    },
], { relativeLinkResolution: 'legacy' }),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGaurdService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent],
  exports: [CustomCurrencyPipe]
})
export class AppModule { }
