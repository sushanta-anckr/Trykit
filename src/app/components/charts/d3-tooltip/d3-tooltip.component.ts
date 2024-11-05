import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './d3-tooltip.component.html',
  styleUrl: './d3-tooltip.component.css'
})
export class D3TooltipComponent implements AfterViewInit {
  @ViewChild('scatterPlotContainer', { static: true }) private chartContainer!: ElementRef;

  private xSize = 500;
  private ySize = 500;
  private margin = 40;
  private xMax = this.xSize - this.margin * 2;
  private yMax = this.ySize - this.margin * 2;

  private data: Array<[number, number]> = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.generateRandomData();
    this.createSvg();
  }

  private generateRandomData(): void {
    const numPoints = 100;
    for (let i = 0; i < numPoints; i++) {
      this.data.push([Math.random() * this.xMax, Math.random() * this.yMax]);
    }
  }

  private createSvg(): void {
    const element = this.chartContainer.nativeElement;

    // Create SVG container
    const svg = d3.select(element)
      .append('svg')
      .attr('width', this.xSize)
      .attr('height', this.ySize)
      .append('g')
      .attr('transform', `translate(${this.margin},${this.margin})`);

    // X Axis
    const x = d3.scaleLinear()
      .domain([0, 500])
      .range([0, this.xMax]);

    svg.append('g')
      .attr('transform', `translate(0,${this.yMax})`)
      .call(d3.axisBottom(x));

    // Y Axis
    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([this.yMax, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Dots
    svg.append('g')
      .selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d: [number, number]) => d[0])
      .attr('cy', (d: [number, number]) => d[1])
      .attr('r', 3)
      .style('fill', 'Red');
  }

}
