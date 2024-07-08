import { inject, Injectable } from '@angular/core';
import { IUserRegister } from '../../models/userregister';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }
  apiUrl = "http://localhost:60805"
  http = inject(HttpClient)

  createUser(user: IUserRegister) {
    return this.http.post(this.apiUrl + '/api/Auth/Register', user);
  }
}
