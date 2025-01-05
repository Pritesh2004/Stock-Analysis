import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StockVisualizeComponent } from '../stock-visualize/stock-visualize.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsComponent } from '../news/news.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HttpClientModule,NavbarComponent, StockVisualizeComponent, NewsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  companies = [
    { name: 'Apple', symbol: 'AAPL' },
    { name: 'Tesla', symbol: 'TSLA' },
    { name: 'Microsoft', symbol: 'MSFT' },
    { name: 'Amazon', symbol: 'AMZN' }
  ];

  selectedCompany = this.companies[0]; // Default to the first company

  selectCompany(company: any): void {
    this.selectedCompany = company;
  }
}
