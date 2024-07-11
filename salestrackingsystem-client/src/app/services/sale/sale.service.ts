import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISale } from '../../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  httpService=inject(HttpClient)
  private baseUrl = 'http://localhost:60805/api';
  constructor() { }

  setSale(sale:ISale){
    console.log(sale)
    return this.httpService.post<any>(`${this.baseUrl}/Sales`,sale)
  }


}
