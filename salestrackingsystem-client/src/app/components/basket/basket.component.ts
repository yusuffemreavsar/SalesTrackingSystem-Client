import { ICustomer } from './../../models/customer';
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
import { CustomerService } from '../../services/customer/customer.service';
import { firstValueFrom } from 'rxjs';

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
  customerService=inject(CustomerService)
  items: IBasketProduct[] | null = [];


  


  async ngOnInit(): Promise<void> {
    this.items = await this.basketLocalStorageService.loadBasketFromLocalStorage();
    

    this.basketService.isOpenBasket.subscribe(status => {
      
      this.isOpenBasket = status;
    });
    
 
    this.basketLocalStorageService.basketItems$.subscribe(items => {

      this.items = items; 

    });
  }
  closeBasket() {
    this.basketService.toggleBasket(false)
  }
  async buyItems() {
    const items = this.items || [];
  
    for (const item of items) {
      const sale: ISale = {
        productId: item.productId!,
        customerId: "",
        quantity: item.quantity!,
        totalPrice: item.totalPrice!
      };
  
      try {
        const user = await firstValueFrom(this.userService.getUser());
        const customers: ICustomer[] = await firstValueFrom(this.customerService.getCustomers());
        const customer = customers.find(customer => customer.userId === user.id);
        
        if (customer) {
          sale.customerId = customer.id;
        } else {
          console.error('Customer not found for user:', user.id);
        }
      } catch (error) {
        console.error('Error fetching user or customers', error);
      }
      if(sale){
        this.saleService.setSale(sale).subscribe(result=>console.log("Process done..."));
        this.items=[];
        this.basketLocalStorageService.setBasket("")
      }

     
    }
    

  }
 
  
  
}
