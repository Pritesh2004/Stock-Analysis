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
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.companySymbol}&interval=5min&apikey=${environment.alphaVantageApiKey}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.stockData = data;
      this.processStockData();
    });
  }

  processStockData(): void {
    const timeSeries = this.stockData['Time Series (5min)'];
    const labels = Object.keys(timeSeries);
    const prices = labels.map((time) => timeSeries[time]['4. close']);

    this.stockChartData = {
      labels: labels.reverse(),
      datasets: [
        {
          label: `${this.companySymbol} Stock Price`,
          data: prices.reverse(),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  }
}