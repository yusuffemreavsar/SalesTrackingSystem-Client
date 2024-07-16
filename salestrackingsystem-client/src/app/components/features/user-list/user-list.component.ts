import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { IUserUpdate } from '../../../models/updateuser';
import { IUserResponse } from '../../../models/userResponse';
import { RegisterService } from '../../../services/register/register.service';
import { LoginService } from '../../../services/login/login.service';
import { IUserLogin } from '../../../models/userlogin';
import { IUserRegister } from '../../../models/userregister';

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
  loginService=inject(LoginService)
  registerService=inject(RegisterService)
  isStatusPopUp:boolean=false;
  isStatusPopUpAdd:boolean=false;
  users: IUserResponse[] = []; 
  customerUpdateForm = this.formBuilder.group({
    id:[''],
    firstName:[''],
    lastName:[''],
    email: [''], 
    phoneNumber:[''] 
  });
customerAddForm = this.formBuilder.group({
  firstName:[''],
  lastName:[''],
  email: [''], 
  phoneNumber:[''],
  password:['']
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
    openPopUpAdd() {
      this.isStatusPopUpAdd=true;
      }
    closePopUpAdd() {
      this.isStatusPopUpAdd=false;
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
    deleteUser(idUser:string){
      const userId: any= {
        id: idUser,
      };
        this.userService.deleteUser(userId).subscribe((result)=>{
          this.ngOnInit();
        }) 

    
    }
    addButton() {
      const user:IUserLogin={
        email: this.customerAddForm.value.email!,
        password:this.customerAddForm.value.password!,
     }
     const registerUser:IUserRegister={
      user:user,
      firstName:this.customerAddForm.value.firstName!,
      lastName:this.customerAddForm.value.lastName!,
      phoneNumber:this.customerAddForm.value.phoneNumber!
     }
     this.registerService.createUser(registerUser).subscribe((response)=>{

      console.log("User Created...")
      this.ngOnInit()
      this.closePopUpAdd()
    })
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
