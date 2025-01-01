import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StockVisualizeComponent } from '../stock-visualize/stock-visualize.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule,NavbarComponent, StockVisualizeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
