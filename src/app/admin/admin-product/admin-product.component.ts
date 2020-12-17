import { product } from './../../models/products';
import { ProductService } from './../../product.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent  implements OnInit{
  products:any[];
  filteredProducts:any[];
  columndefs : any[] = ['Title','Price','Action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private productService:ProductService) { 
  }

  filter(query:string){
    this.filteredProducts=(query)?
    this.products.filter((p:{data:product})=>p.data.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
    this.dataSource = new MatTableDataSource(this.filteredProducts);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    this.productService.getAll().subscribe(products=>{
      this.dataSource = new MatTableDataSource(products);
      this.filteredProducts=products;
      this.products=products;
      this.dataSource.paginator = this.paginator;
    
    });
    
  }    
}

