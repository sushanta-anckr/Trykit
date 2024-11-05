import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Highcharts from "highcharts";
import { Options } from "highcharts";
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-highcharts',
  standalone: true,
  imports: [CommonModule,HighchartsChartModule],
  templateUrl: './highcharts.component.html',
  styleUrl: './highcharts.component.css'
})
export class HighchartsComponent {

  
 Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() {
    this.chartOptions = {
      credits: {
        enabled: false,
      },
      colors: ['#ff7f1f', '#66d97e', '#1f77b4', '#FF5349'],
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        labels: {
          format: '{value}%',
        },
      },
      legend: {
        floating: false,
      },
      tooltip: {
        pointFormat: `<span style="color:{series.color}">{series.name}</span>: <b>$ {point.y:,.2f}</b> ({point.percentage:.1f}%)<br/>`,
        shared: true,
      },
      plotOptions: {
        column: {
          stacking: 'percent',
          dataLabels: {
            enabled: true,
            format: `$ {y:,.2f}`,
            rotation: 270,
            color: '#000000',
            style: {
              textOutline: 'none',
            },
          },
        },
        series: {
          borderColor: 'none',
        },
      },
      series: [
        {
          type: 'column',
          name: 'Remaining',
          data: [50, 60, 70, 80],
        },
        {
          type: 'column',
          name: 'Credits',
          data: [20, 30, 40, 50],
        },
        {
          type: 'column',
          name: 'Expense',
          data: [30, 20, 10, 20],
        },
        {
          type: 'column',
          name: 'OverExpenses',
          data: [10, 5, 15, 25],
        },
      ],
      exporting: {
        enabled: false,
      },
    };
  }
}
