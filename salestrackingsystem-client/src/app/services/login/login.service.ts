import { inject, Injectable } from '@angular/core';
import { IUserLogin } from '../../models/userlogin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl="http://localhost:60805"
  http=inject(HttpClient)
  constructor() { }

  loginUser(user:IUserLogin){
    return this.http.post<{accessToken: { token: string }}>(this.apiUrl +'/api/Auth/Login',user);
  }
}
