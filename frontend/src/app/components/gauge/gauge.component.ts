import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';  // ✅ Import this
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gauge',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],  // ✅ Add CommonModule
  templateUrl: './gauge.component.html',
  styleUrl: './gauge.component.css'
})
export class GaugeComponent implements OnChanges {

  @Input() probability!: number;  // Accepts probability (0 to 1)
  @Input() label!: string; // Label for the gauge (e.g., "Trade Probability")

  public gaugeChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  public gaugeChartData: any;
  public gaugeChartType: ChartType = 'doughnut';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['probability'] && this.probability !== undefined) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const probabilityValue = Math.round(this.probability * 100);  // Convert to %
    const remaining = 100 - probabilityValue;

    this.gaugeChartData = {
      labels: ['Probability', 'Remaining'],
      datasets: [{
        data: [probabilityValue, remaining],
        backgroundColor: ['#22c55e', '#e5e7eb'], // Green for probability, Grey for remaining
        borderWidth: 0,
        hoverBackgroundColor: ['#16a34a', '#d1d5db'], // Slightly darker shades for hover
        cutout: '75%'  
      }]
    };
  }
}
