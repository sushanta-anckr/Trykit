import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit{
  constructor(private el: ElementRef) {}


  ngOnInit(): void {
    this.createDonutChart();

    window.addEventListener('resize', () => {
      d3.select(this.el.nativeElement).select('svg').remove();  // Remove existing chart
      this.createDonutChart();  // Recreate the chart with new dimensions
    });
  }

  createDonutChart(){
    const data = [
      { label: 'A', value: 30 },
      { label: 'B', value: 70 },
      { label: 'C', value: 50 },
      { label: 'E', value: 40 },
      { label: 'F', value: 40 },
      { label: 'G', value: 60 },
      { label: 'H', value: 40 },
      { label: 'I', value: 70 },
      { label: 'J', value: 40 },
      { label: 'K', value: 40 },
    ];

    const element = this.el.nativeElement.querySelector('.donut-chart');
    const elementWidth = element.clientWidth;
    const width = elementWidth > 500 ? 500 : elementWidth;  // Adjust max width
    const height = width; 
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }; // Added margin
    const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right); // Adjusted radius based on margin

    const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(d3.schemeCategory10);


    const pie = d3.pie<any>()
      .sort(null)
      .value((d: any) => d.value);

      const arc = d3.arc<any>()
      .innerRadius(radius * 0.5)  // Donut hole size
      .outerRadius(radius);

      // Create tooltip
    const tooltip = d3.select(element)
    .append('div')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'white')
    .style('border', '1px solid #ccc')
    .style('padding', '8px')
    .style('border-radius', '4px')
    .style('box-shadow', '0px 0px 8px rgba(0, 0, 0, 0.1)')
    .style('font-size', '12px');


      const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

      arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.label)as string)
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', d3.arc<any>()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 1.1));  // Expand the arc on hover

        tooltip.html(`<strong>${d.data.label}</strong>: ${d.data.value}`)
          .style('visibility', 'visible');
      })
      .on('mousemove', function (event) {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      }) .on('mouseout', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', d3.arc<any>()
            .innerRadius(radius * 0.5)
            .outerRadius(radius));  // Reset the arc size on mouse out

        tooltip.style('visibility', 'hidden');
      });


      arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .text((d: any) => d.data.label)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill','white')

         // Add text to center of donut
    svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-0.5em')
    .style('font-size', '24px')
    .style('fill', '#333')
    .text('Total');

  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '1.5em')
    .style('font-size', '18px')
    .style('fill', '#333')
    .text(d3.sum(data, d => d.value));

  // Add legend
  const legend = svg.append('g')
    .attr('transform', `translate(${radius + 20},${-radius})`);

  const legendItem = legend.selectAll('.legend-item')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  // Legend colored boxes
  legendItem.append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', (d: any) => color(d.label)as string);

  // Legend text
  legendItem.append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '0.35em')
    .text((d: any) => d.label);

  }

  
  
}
