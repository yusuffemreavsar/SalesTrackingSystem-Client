import { Component } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  products: IProduct[] = [];

}
