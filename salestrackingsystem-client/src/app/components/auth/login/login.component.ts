import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUserLogin } from '../../../models/userlogin';
import { LoginService } from '../../../services/login/login.service';
import { TokenService } from '../../../core/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder=inject(FormBuilder);
  httpService=inject(LoginService)
  tokenService=inject(TokenService)
  router=inject(Router)
  loginForm = this.formBuilder.group({
    email: [''], 
    password: [''], 
  });
  
onSubmit() {
  const user:IUserLogin={
    email: this.loginForm.value.email!,
    password:this.loginForm.value.password!,
 }
 this.httpService.loginUser(user).subscribe((response)=>{
  try {
    this.tokenService.setToken(response.accessToken.token)
    console.log("Success...")
 this.router.navigate(['/main']);  
  } catch (error) {
    console.log(error)
  }
  
 })
}

}
