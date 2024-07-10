import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { TokenService } from '../../../core/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isOpenBasket:boolean=false;
  navbarService=inject(NavbarService)
  tokenService=inject(TokenService)
  isLoggedIn: boolean = false;
  checkToken() {
    const token = this.tokenService.getToken();
    if (token) {
      this.isLoggedIn = true;
    }
  }
  async ngOnInit() {
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
    this.isOpenBasket=true;
  }
}
