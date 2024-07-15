import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IProduct } from '../../../../models/product';
import { ProductService } from '../../../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: IProduct[] = []; 
  productService=inject(ProductService)
  ngOnInit(){
    this.productService.getProducts().subscribe(data=>{
      console.log(data)
      this.products=data
    })
  }
}
