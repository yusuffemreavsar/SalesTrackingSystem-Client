import { ChangeDetectorRef, Component, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { IBasketProduct } from '../../models/basketproduct';
import { BasketComponent} from '../../components/basket/basket.component';
import { EventEmitter } from 'stream';
import { BasketService } from '../../services/basket/basket.service';
import { BasketLocalStorageService } from '../../core/basketlocalstorage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,BasketComponent,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  popupOpen: boolean = true;
  basketService=inject(BasketService)
  basketLocalStorageService=inject(BasketLocalStorageService)
  httpService=inject(ProductService)
  products: IProduct[] = [];
  cardItems:IBasketProduct[]=[]
  selectedQuantities: { [productId: string]: number } = {};
  
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.httpService.getProducts().subscribe((data:IProduct[])=>
      {
        this.products=data
      }
      
    )
  }
  addBasket(productId:string,quantity:number,productPrice:number) {
    const totalPrice=quantity*productPrice
    const product:IBasketProduct={
     customerId:"123",
     productId:productId,
     quantity:quantity,
     totalPrice:totalPrice
   }
   console.log("Sepete eklendi.")
   this.basketLocalStorageService.saveBasketToLocalStorage(product);
   this.basketLocalStorageService.loadBasketFromLocalStorage();
     console.log(localStorage.getItem("basketItems"))
    
   
  }
  openPopUp(){
    this.popupOpen=true;
  }
  checkMaxQuantity(product: any): void {
    const maxQuantity = product.stockQuantity;
    const productId = product.id;

    if (this.selectedQuantities[productId] > maxQuantity) {
      // Kullanıcı girdiği miktarı stok miktarına eşitleyebiliriz
      this.selectedQuantities[productId] = maxQuantity;
    }
  }
  checkQuantityValidity(product: any): void {
    const productId = product.id;
    if (this.selectedQuantities[productId] <= 0) {
      // Eğer kullanıcı 0 veya daha az miktar girmişse, 1 olarak ayarlayalım
      this.selectedQuantities[productId] = 1;
    }
  }

  isQuantityValid(quantity: number): boolean {
    return quantity > 0; // Kullanıcı sıfır veya daha az miktar giremez
  }
}
