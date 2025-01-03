import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';  // Correct import

// Register all chart components
Chart.register(...registerables);

@Component({
  selector: 'app-stock-visualize',
  templateUrl: './stock-visualize.component.html',
  styleUrls: ['./stock-visualize.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, BaseChartDirective]  // Use ChartsModule here
})
export class StockVisualizeComponent implements OnInit{
  stockData: any;
  stockChartData!: ChartData<'line'>;
  stockChartOptions: ChartOptions = {  // Initialize with default options
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
  ngOnInit(): void {
    this.fetchStockData();
  }

  fetchStockData() {
    this.http
      .get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=UMGPMGEYPHPY0UES')
      .subscribe((data) => {
        this.stockData = data;
        this.processStockData();
      });
  }

  processStockData() {
    const timeSeries = this.stockData['Time Series (5min)'];
    const labels = Object.keys(timeSeries);
    const prices = labels.map(time => timeSeries[time]['4. close']);
    
    this.stockChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Stock Price',
          data: prices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  }
}
