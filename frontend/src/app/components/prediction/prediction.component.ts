import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StockVisualizeComponent } from '../stock-visualize/stock-visualize.component';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-prediction',
  imports: [NavbarComponent,CommonModule, HttpClientModule, StockVisualizeComponent , NewsComponent],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {
  
  title = '';
  description = '';
  ticker:number = 123; // Default ticker, can be dynamically set if needed
  predictionResult: any = null;
  isLoading = false;
  errorMessage = '';

  private predictionApiUrl = 'http://localhost:8000/predict'; // Update with your API's actual URL

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.title = params['title'] || '';
      this.description = params['description'] || '';
      this.makePrediction();
    });
  }

  makePrediction(): void {
    if (!this.title || !this.description) {
      this.errorMessage = 'Invalid data provided for prediction.';
      return;
    }

    const payload = {
      headline: this.title + ' ' + this.description,
      ticker: this.ticker,
    };

    this.isLoading = true;
    this.http.post(this.predictionApiUrl, payload).subscribe(
      (response) => {
        this.predictionResult = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to get prediction. Please try again later.';
        this.isLoading = false;
      }
    );
  }
}
