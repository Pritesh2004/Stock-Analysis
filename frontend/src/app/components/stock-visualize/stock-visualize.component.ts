import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';  // Correct import
import { environment } from '../../const/environment';

// Register all chart components
Chart.register(...registerables);

@Component({
  selector: 'app-stock-visualize',
  templateUrl: './stock-visualize.component.html',
  styleUrls: ['./stock-visualize.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective]  // Use ChartsModule here
})
export class StockVisualizeComponent implements OnChanges {
  @Input() companySymbol!: string;

  stockData: any;
  latestStockData: any;
  latestStockDate: any;
  stockChartData!: ChartData<'line'>;
  stockChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)'
        }
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.companySymbol) {
      this.fetchStockData();
    }
  }

  fetchStockData(): void {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.companySymbol}&apikey=${environment.alphaVantageApiKey}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.stockData = data;
      this.processStockData();
    });
  }
  
  processStockData(): void {
    const timeSeries = this.stockData['Time Series (Daily)'];
    if (!timeSeries) return;

    const sortedDates = Object.keys(timeSeries)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 25); // Get the last 25 days

    const prices = sortedDates.map((date) => timeSeries[date]['4. close']);

    this.stockChartData = {
      labels: sortedDates.reverse().map((date) => this.formatShortDate(date)),
      datasets: [
        {
          label: `${this.companySymbol} Stock Price`,
          data: prices.reverse(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    // Store the latest stock data (most recent day)
    this.latestStockDate = sortedDates[sortedDates.length-1];
    this.latestStockData = timeSeries[sortedDates[sortedDates.length-1]];
  }
  

  
  formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
}