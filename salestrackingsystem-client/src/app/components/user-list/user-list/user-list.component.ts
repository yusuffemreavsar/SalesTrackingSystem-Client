import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { ICustomer } from '../../../models/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  customerService=inject(CustomerService)
  users: ICustomer[] = []; 
  ngOnInit(){
    this.customerService.getCustomers().subscribe(data=>{
      this.users=data
    })
  }

}
