import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  apiUrl="http://localhost:60805/api"
  http=inject(HttpClient)

  
  getProducts(): Observable<IProduct[]> {
    return this.http.get<any>(`${this.apiUrl}/Products?PageIndex=0&PageSize=10`).pipe(
      map(response => {
        const products: IProduct[] = response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description:item.description,
          stockQuantity: item.stockQuantity,
          price: item.price
        }));
        return products;
      })
    );
  }
}
