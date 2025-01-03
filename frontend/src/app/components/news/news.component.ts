import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'], // Fixed typo from styleUrl to styleUrls
})
export class NewsComponent implements OnInit {
  newsData: any[] = [];
  isLoading = true;
  errorMessage = '';

  private apiUrl =
    'https://newsdata.io/api/1/latest?apikey=pub_642552ec94792d0d4edddb8f84870e011850f&q=Tesla%20stock';

  constructor(private http: HttpClient, private router: Router) {}

  fetchNews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  ngOnInit(): void {
    this.fetchNews().subscribe(
      (data) => {
        this.newsData = data.results; // Adjust based on API response structure
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load news. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  goToPrediction(article: any): void {
    this.router.navigate(['/prediction'], {
      queryParams: {
        title: article.title,
        description: article.description,
      },
    });
  }
}
