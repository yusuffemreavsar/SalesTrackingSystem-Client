
import { Component, inject } from '@angular/core';
import { CustomerService } from '../../../services/customer/customer.service';
import { ICustomer } from '../../../models/customer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { IUserUpdate } from '../../../models/updateuser';
import { IUserResponse } from '../../../models/userResponse';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  formBuilder=inject(FormBuilder);
  userService=inject(UserService)
  isStatusPopUp:boolean=false;
  users: IUserResponse[] = []; 
  customerUpdateForm = this.formBuilder.group({
    id:[''],
    firstName:[''],
    lastName:[''],
    email: [''], 
    phoneNumber:[''] 
  });
  ngOnInit(){
    this.userService.getUsers().subscribe(data=>{
      console.log(data)
      this.users=data
    })
  }
  openPopUp() {
    this.isStatusPopUp=true;
    }
  closePopUp() {
    this.isStatusPopUp=false;
    }
  onSubmit() {
    this.userService.getUserById(this.customerUpdateForm.value.id!).subscribe(data=>{
      console.log(data.id)
      let user:IUserUpdate={
        id:data.id,
        firstName:this.customerUpdateForm.value.firstName!,
        lastName:this.customerUpdateForm.value.lastName!,
        email:this.customerUpdateForm.value.email!,
        phoneNumber:this.customerUpdateForm.value.phoneNumber!
      }
      console.log(user)
      this.userService.updateUser(user).subscribe(result=>{
        console.log("result",result)
        this.closePopUp()
        this.ngOnInit()
      })


    }
      
    );
    
   

    }
    addButton() {
    
    }
    deleteButton() {
    
    }
    updateButton() {
      this.openPopUp()
      
    }
    loadUserDetails(user: IUserResponse) {
      this.customerUpdateForm.patchValue({
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    
    );
  
    }
}
