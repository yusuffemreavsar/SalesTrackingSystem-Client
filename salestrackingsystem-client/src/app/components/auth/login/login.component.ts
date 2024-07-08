import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder=inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: [''], 
    password: [''], 
  });
  
onSubmit() {
 console.log("hi")
}

}
