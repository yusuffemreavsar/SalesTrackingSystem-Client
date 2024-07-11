import { ISale } from './../../models/sale';
import { Component, inject, Input } from '@angular/core';
import { IBasketProduct } from '../../models/basketproduct';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../services/basket/basket.service';
import { BasketLocalStorageService } from '../../core/basketlocalstorage.service';
import { SaleService } from '../../services/sale/sale.service';
import { TokenService } from '../../core/token.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  basketLocalStorageService=inject(BasketLocalStorageService)
  saleService=inject(SaleService)
  userService=inject(UserService)
  
  isOpenBasket:boolean=false;
  basketService=inject(BasketService)
  items: IBasketProduct[] | null = [];


  


  async ngOnInit(): Promise<void> {
    // Asenkron olarak localStorage'dan verileri çek
    this.items = await this.basketLocalStorageService.loadBasketFromLocalStorage();
    
    // isOpenBasket durumunu dinle
    this.basketService.isOpenBasket.subscribe(status => {
      
      this.isOpenBasket = status;
    });
    
    // basketItems$ Observable'ını dinleyerek verileri güncelle
    this.basketLocalStorageService.basketItems$.subscribe(items => {

      this.items = items; // LocalStorage'dan gelen verileri güncelle
      console.log("burdayim")
      console.log("Items",items)
      
    
    });
  }
  closeBasket() {
    this.basketService.toggleBasket(false)
  }

  buyItems() {
    this.items?.forEach(item => {
      const sale: ISale = {
        productId: item.productId!,
        customerId: "", // Default değeri boş olarak ayarlandı
        quantity: item.quantity!,
        totalPrice: item.totalPrice!
      };
  
      // Kullanıcıyı almak için UserService'den getUser() fonksiyonunu kullanın
      this.userService.getUser().subscribe(
        user => {
          // Kullanıcıyı alındıktan sonra customerId'yi ayarla
          sale.customerId = user.id;
  
          // Şimdi SaleService'e sale objesini gönderin
          this.saleService.setSale(sale).subscribe(
            result => {
              console.log(result);
            },
            error => {
              console.error("Error setting sale:", error);
            }
          );
        },
        error => {
          console.error("Error fetching user:", error);
        }
      );
    });
  }
  
}
