import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISale } from '../../models/sale';
import { map, Observable } from 'rxjs';
import { ISaleAdd } from '../../models/saleAdd';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  httpService=inject(HttpClient)
  private baseUrl = 'http://localhost:60805/api';
  constructor() { }

  setSale(sale:ISaleAdd){
    console.log(sale)
    return this.httpService.post<any>(`${this.baseUrl}/Sales`,sale)
  }
  getSales(): Observable<ISale[]> {
    return this.httpService.get<any>(`${this.baseUrl}/Sales?PageIndex=0&PageSize=50`).pipe(
      map(response => {
        const sales: ISale[] = response.items.map((item: ISale) => ({
          customerId:item.customerId,
          productId:item.productId,
          quantity:item.quantity,
          totalPrice:item.totalPrice,
          createdDate:item.createdDate
        }));
        return sales;
      })
    );
  }


}
