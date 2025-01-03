import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StockVisualizeComponent } from '../stock-visualize/stock-visualize.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule,NavbarComponent, StockVisualizeComponent, NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
