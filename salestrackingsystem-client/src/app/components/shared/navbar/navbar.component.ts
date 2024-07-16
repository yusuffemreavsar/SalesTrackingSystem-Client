import { BasketLocalStorageService } from './../../../core/basketlocalstorage.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { TokenService } from '../../../core/token.service';
import { BasketComponent } from "../../basket/basket.component";
import { BasketService } from '../../../services/basket/basket.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, BasketComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isOpenBasket:boolean=false;
  navbarService=inject(NavbarService)
  userService=inject(UserService)
  basketService=inject(BasketService)
  tokenService=inject(TokenService)
  basketLocalStorageService=inject(BasketLocalStorageService)
  isLoggedIn: boolean = true;
  userName:string=""
  checkToken() {
    const token = this.tokenService.getToken();
    if (token) {
      this.isLoggedIn = true;
    }
  }
  ngOnInit() {
    this.navbarService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.checkToken()
    this.userService.getUser().subscribe(user=>{
      this.userName=user.firstName
    })

  }
  logout() {
    this.isLoggedIn=false;
    this.tokenService.setToken("");
    this.basketLocalStorageService.setBasket("");
  }
  openBasket() {
    this.basketService.toggleBasket(true)
  }
}
