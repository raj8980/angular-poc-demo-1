import { CategoryService } from './../../category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent  {
  category$;
  @Input ('category') category;
  constructor(categoryService:CategoryService) {
    this.category$=categoryService.getAll();
   }

 

}
