import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasketProduct } from '../../models/basketproduct';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor() { }

  private itemsSubject = new BehaviorSubject<IBasketProduct[]>([]);
  items$ = this.itemsSubject.asObservable();

  private isBasketSubject = new BehaviorSubject<boolean>(false);
  isOpenBasket = this.isBasketSubject.asObservable();

  toggleBasket(status:boolean){
      this.isBasketSubject.next(status)
  }

  getItems(): IBasketProduct[] {
    return this.itemsSubject.getValue();
  }
  addItem(item: IBasketProduct): void {
    const currentItems = this.getItems();
    currentItems.push(item);
    this.itemsSubject.next(currentItems);
  }

}
