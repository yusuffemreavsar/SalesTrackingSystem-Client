import { Component, inject } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { IBasketProduct } from '../../models/basketproduct';
import { BasketComponent} from '../../components/card/basket.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,BasketComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
popupOpen: boolean = true;
openPopUp(){
  this.popupOpen=true;
}
  httpService=inject(ProductService)
  products: IProduct[] = [];
  cardItems:IBasketProduct[]=[]
  
  ngOnInit(): void {
    this.httpService.getProducts().subscribe((data:IProduct[])=>
      {
        this.products=data
      }
      
    )
  }
  buyProduct(productId:string,quantity:number=10,productPrice:number) {
    const totalPrice=quantity*productPrice
    const product:IBasketProduct={
     customerId:"123",
     productId:productId,
     quantity:quantity,
     totalPrice:totalPrice
   }
     console.log(product)
     this.cardItems.push(product)
     console.log(this.cardItems)
  }
}
