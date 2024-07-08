import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../models/user';
import { IUserRegister } from '../../../models/userregister';
import { RegisterService } from '../../../services/register/register.service';
import { Router, RouterLink } from '@angular/router';
import { IUserLogin } from '../../../models/userlogin';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formBuilder=inject(FormBuilder);
  httpService=inject(RegisterService);
  router=inject(Router)
  registerForm = this.formBuilder.group({
    firstName: [''], 
    lastName: [''], 
    email: [''], 
    password:[''],
    phoneNumber: [''], 
  });

onSubmit() {
  const user:IUserLogin={
    email: this.registerForm.value.email!,
    password:this.registerForm.value.password!,
 }
 const registerUser:IUserRegister={
  user:user,
  firstName:this.registerForm.value.firstName!,
  lastName:this.registerForm.value.lastName!,
  phoneNumber:this.registerForm.value.phoneNumber!
 }
this.httpService.createUser(registerUser).subscribe((response)=>{
  this.router.navigate(['/login']);
  console.log("User Created...")
})

}

}
