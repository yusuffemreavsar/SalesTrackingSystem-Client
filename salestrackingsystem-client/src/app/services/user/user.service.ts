import { inject, Injectable } from '@angular/core';
import { TokenService } from '../../core/token.service';
import { JwtService } from '../jwt/jwt.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user';
import { map, Observable } from 'rxjs';
import { IUserUpdate } from '../../models/updateuser';
import { IUserResponse } from '../../models/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:60805/api"
  http = inject(HttpClient)
  jwtService = inject(JwtService)
  tokenService = inject(TokenService)
  token = this.tokenService.getToken();
  decodedJwt = this.jwtService.getDecodedAccessToken(this.token!);
  nameIdentifier = this.decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  constructor() { }
  getUser() {
    return this.http.get<{ id: string, firstName: string, lastName: string, email: string, phoneNumber: string }>(this.apiUrl + `/Users/${this.nameIdentifier}`);
  }
  getUserById(id:string) {
    return this.http.get<{ id: string, firstName: string, lastName: string, email: string, phoneNumber: string }>(this.apiUrl + `/Users/${id}`);
  }
  getUsers(): Observable<IUserResponse[]> {
    return this.http.get<any>(`${this.apiUrl}/Users?PageIndex=0&PageSize=10`).pipe(
      map(response => {
        const users: IUserResponse[] = response.items.map((item: IUserResponse) => ({
          id:item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phoneNumber: item.phoneNumber,
        }));
        return users;
      })
    );
  }
  updateUser(user: IUserUpdate) {
    return this.http.put("http://localhost:60805/api/Users", user);
  }
  deleteUser(user:{id:string}){
    return this.http.delete<any>(this.apiUrl+"/Users",{body:user})
  }
  

}
