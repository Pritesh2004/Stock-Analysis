import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../const/environment';
import { AuthService } from '../../service/auth.service';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnChanges {
  @Input() companyName!: string;
  @Input() companySymbol!: string;

  newsData: any[] = [];
  isLoading = true;
  errorMessage = '';

  selectedArticleIndex: number | null = null;
  predictionResult: any = null;
  isLoadingPrediction = false;
  errorMessagePrediction = '';

  private predictionApiUrl = 'http://localhost:8000/predict'; // Update with your actual API URL

  constructor(private http: HttpClient, private authService : AuthService, private router : Router, private newsService : NewsService) {}

  ngOnChanges(): void {
    if (this.companyName) {
      this.fetchNews();
    }
    // this.newsService.getNews().subscribe((data) => {
    //   this.isLoading = false;
    //   this.newsData = data;
    // });
  }

  fetchNews(): void {
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${environment.newsApiKey}&q=${this.companyName} stock`;
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.newsData = data.results || [];
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load news. Please try again later.';
        this.isLoading = false;
      }
    );
  }

 navigateToPrediction(article: any) {
    this.router.navigate(['/prediction'], {
      queryParams: {
        title: article.title,
        description: article.description,
        companyName: this.companyName,
        companySymbol: this.companySymbol,
      },
    }).then(() => {
      // Scroll to the top of the page after navigation
      window.scrollTo(0, 0);
    });
  }
  

  // togglePrediction(index: number, article: any): void {
  //   if (!this.authService.getToken()) {
  //     // If user is not logged in, show a pop-up and redirect to login
  //     alert('Please log in first to use the prediction feature.');
  //     this.router.navigate(['/login']); // Adjust the route as needed
  //     return;
  //   }
  //   if (this.selectedArticleIndex === index) {
  //     // Hide prediction if already selected
  //     this.selectedArticleIndex = null;
  //     this.predictionResult = null;
  //     return;
  //   }

  //   // Show prediction for the selected article
  //   this.selectedArticleIndex = index;
  //   this.makePrediction(article);
  // }

  // makePrediction(article: any): void {
  //   const payload = {
  //     headline: article.title + ' ' + article.description,
  //     ticker: 123, // Assuming this is your ticker
  //   };

  //   this.isLoadingPrediction = true;
  //   this.errorMessagePrediction = '';
  //   this.predictionResult = null;

  //   this.http.post(this.predictionApiUrl, payload).subscribe(
  //     (response: any) => {
  //       this.predictionResult = response; // Adjust according to API response
  //       this.isLoadingPrediction = false;
  //       console.log(response);
  //     },
  //     (error) => {
  //       this.errorMessagePrediction = 'Failed to get prediction. Please try again later.';
  //       this.isLoadingPrediction = false;
  //     }
  //   );
  // }
}
