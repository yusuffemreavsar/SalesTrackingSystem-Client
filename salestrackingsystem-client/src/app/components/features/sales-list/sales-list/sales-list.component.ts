import { Component, inject } from '@angular/core';
import { ISale } from '../../../../models/sale';
import { CommonModule } from '@angular/common';
import { SaleService } from '../../../../services/sale/sale.service';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent {
  sales: ISale[] = []; 
  saleService=inject(SaleService)
  ngOnInit(){
    this.saleService.getSales().subscribe(data=>{
     
      console.log(data)
      this.sales=data
    })
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 0-11 aralığında olduğu için +1 yapıyoruz
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



}
