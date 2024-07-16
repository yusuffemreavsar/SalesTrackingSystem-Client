import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IProduct } from '../../../../models/product';
import { ProductService } from '../../../../services/product/product.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productService=inject(ProductService)
  formBuilder=inject(FormBuilder);
  products: IProduct[] = []; 
  productUpdateForm = this.formBuilder.group({
    id:[''],
    name:[''],
    description:[''],
    stockQuantity: [0], 
    price:[0] 
  });
isStatusPopUp:boolean= false;
onSubmit() {
  let product:IProduct={
    id:this.productUpdateForm.value.id!,
    name:this.productUpdateForm.value.name!,
    description:this.productUpdateForm.value.description!,
    stockQuantity:this.productUpdateForm.value.stockQuantity!,
    price:this.productUpdateForm.value.price!
  }

  this.productService.updateProduct(product).subscribe(result=>{
    console.log("ok")
    this.ngOnInit();
    this.closePopUp();
  })
}
closePopUp() {
  this.isStatusPopUp=false
}
openPopUp() {
  this.isStatusPopUp=true
}

  
  ngOnInit(){
    this.productService.getProducts().subscribe(data=>{
      console.log(data)
      this.products=data
    })
  }
  loadCustomerDetails(product: IProduct) {
    this.productUpdateForm.patchValue({
      id:product.id,
      name: product.name,
      description: product.description,
      stockQuantity:product.stockQuantity,
      price:product.price
    }
  );
    }
}
