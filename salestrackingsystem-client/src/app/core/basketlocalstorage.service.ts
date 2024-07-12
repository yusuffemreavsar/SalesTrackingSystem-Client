import { Injectable } from '@angular/core';
import { IBasketProduct } from '../models/basketproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketLocalStorageService {
  

  constructor() { }
  private basketItemsSubject = new BehaviorSubject<IBasketProduct[]>([]); // BehaviorSubject kullanarak verileri tutuyoruz
  basketItems$ = this.basketItemsSubject.asObservable(); // Dışarıdan Observable olarak erişilebilir
  
  saveBasketToLocalStorage(newItem: IBasketProduct): void {
    // Load existing items from localStorage
    let existingItems = this.loadBasketFromLocalStorage();
  
    // If there are existing items, merge new item with existing ones
    if (existingItems && existingItems.length > 0) {
      // Check if newItem already exists in existingItems
      const existingItemIndex = existingItems.findIndex(item => item.productId === newItem.productId);
  
      if (existingItemIndex !== -1) {
        // If newItem already exists, update quantity and total price
        existingItems[existingItemIndex].quantity += newItem.quantity;
        existingItems[existingItemIndex].totalPrice += newItem.totalPrice;
      } else {
        // If newItem does not exist, push it to existingItems
        existingItems.push(newItem);
      }
    } else {
      // If no existing items, initialize with newItem
      existingItems = [newItem];
    }
  
    // Save updated items to localStorage
    const itemsJSON = JSON.stringify(existingItems);
    localStorage.setItem('basketItems', itemsJSON);
  }
  
  
  // Sepet verilerini okuma fonksiyonu
 loadBasketFromLocalStorage(): IBasketProduct[] | null {
  const itemsJSON = localStorage.getItem('basketItems');
  if (itemsJSON) {
    const items: IBasketProduct[] = JSON.parse(itemsJSON);
    this.basketItemsSubject.next(items);
    return JSON.parse(itemsJSON);
  }
  return null;
}

}