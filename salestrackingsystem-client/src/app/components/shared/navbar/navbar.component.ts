import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { TokenService } from '../../../core/token.service';
import { BasketComponent } from "../../basket/basket.component";
import { BasketService } from '../../../services/basket/basket.service';

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
  basketService=inject(BasketService)
  tokenService=inject(TokenService)
  isLoggedIn: boolean = true;
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

  }
  logout() {
    this.isLoggedIn=false;
    this.tokenService.setToken("");
  }
  openBasket() {
    this.basketService.toggleBasket(true)
  }
}
