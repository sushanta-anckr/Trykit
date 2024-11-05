import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3charts',
  standalone: true,
  imports: [],
  templateUrl: './d3charts.component.html',
  styleUrl: './d3charts.component.css'
})
export class D3chartsComponent  implements OnInit{
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

// data = [
// { layers: [{ value: 10, color: 'blue' }, { value: 20, color: 'red' }] },
// { layers: [{ value: 15, color: 'green' }, { value: 15, color: 'yellow' }] },
// { layers: [{ value: 10, color: 'orange' }, { value: 30, color: 'purple' }] },
// { layers: [{ value: 25, color: 'pink' }, { value: 15, color: 'brown' }] },
// { layers: [{ value: 20, color: 'cyan' }, { value: 30, color: 'magenta' }] }
// ];

private createChart(): void {
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Data
  const data = [
    { category: 'Category 1', Remaining: 50, Credits: 20, Expense: 30, OverExpenses: 10 },
    { category: 'Category 2', Remaining: 60, Credits: 30, Expense: 20, OverExpenses: 0 },
    { category: 'Category 3', Remaining: 70, Credits: 40, Expense: 10, OverExpenses: 15 },
    { category: 'Category 4', Remaining: 80, Credits: 50, Expense: 20, OverExpenses: 25 },
    { category: 'Category 5', Remaining: 40, Credits: 25, Expense: 35, OverExpenses: 20 },
    { category: 'Category 6', Remaining: 55, Credits: 45, Expense: 25, OverExpenses: 10 },
    { category: 'Category 7', Remaining: 65, Credits: 30, Expense: 20, OverExpenses: 15 },
  ];

  const seriesNames = ['OverExpenses', 'Expense', 'Credits', 'Remaining']
  const rangeColor=['#FF5349', '#1f77b4', '#66d97e', '#ff7f1f']

  // Colors
  const color = d3.scaleOrdinal()
    .domain(seriesNames)
    .range(rangeColor);

  // X and Y Scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([0, width])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, 1])
    .nice()
    .range([height, 0]);

  // Stack the data
  const stack = d3.stack()
    .keys(seriesNames)
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetExpand);

  const stackedData = stack(data as any).reverse();

  // X Axis
  svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Y Axis
  svg.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y).tickFormat(d3.format('.0%')));

  

 // Add bars
 const bars = svg.append('g')
 .selectAll('g')
 .data(stackedData)
 .enter().append('g')
 .attr('fill', d => color(d.key)as any);

bars.selectAll('rect')
 .data(d => d)
 .enter().append('rect')
 .attr('x', (d:any) => x(d.data.category)!)
 .attr('y', d => y(d[1]))
 .attr('height', d => y(d[0]) - y(d[1]))
 .attr('width', x.bandwidth())
 .on('mouseover', function(event, d:any) {
      const category = d.data.category;
      const total = d3.sum(seriesNames, key => d.data[key]);

      // Aggregate data for the hovered category
      const values = seriesNames.map(key => {
        const value = d.data[key];
        const percentage=(value/total *100).toFixed(2)
        return value > 0 ? `<span style="color:${color(key)}">${key}: $ ${d3.format(',.2f')(value)}(${percentage}%)</span><br/>` : '';
      }).join('');

      // Get the x and y positions of the hovered bar
      const xPos = x(d.data.category)! + x.bandwidth() / 2; // Center horizontally
      const yPos = y(d[0]);

      // Set tooltip content and position
      d3.select('#tooltip-text')
        .html(`${category}:<br/>${values}`);

      d3.select('#tooltip')
        .style('left', `${event.pageX - 70}px`) // Center horizontally near the cursor
        .style('top', `${event.pageY - 90}px`) // Adjust vertically to be above the bar
        .classed('show', true); // Show tooltip with transition
    })
    .on('mouseout', () => d3.select('#tooltip').classed('show', false));

// Close modal when clicking on the close button

// Add data labels - **New Section**
bars.selectAll('text')
 .data(d => d)
 .enter().append('text')
 .attr('x', (d:any) => x(d.data.category)! + x.bandwidth() / 2) // Center text horizontally
 .attr('y', d => y(d[0]) + (y(d[1]) - y(d[0])) / 2) // Center text vertically within the bar segment
 .attr('dy', '.35em')
 .attr('text-anchor', 'middle')
 .attr('transform', (d:any) => `rotate(-90, ${x(d.data.category)! + x.bandwidth() / 2}, ${y(d[0]) + (y(d[1]) - y(d[0])) / 2})`) // Rotate text 90 degrees
 .text((d:any) => {
  const value = (d[1] - d[0]) * totalValue(d.data);
  return value > 0 ? `$ ${d3.format(',.2f')(value)}` : '';
 }) // Display the value within the segment
 .style('fill', '#000') // Text color
 .style('font-size', '12px')
 .style('font-weight', 'bold')
 .style('pointer-events', 'none'); // Ensure text doesn't interfere with mouse events




  // Tooltip
  d3.select('body').append('div')
    .attr('id', 'tooltip')
    .attr('class', 'hidden')
    .append('h1')
    .attr('id', 'value');

    function totalValue(data: any) {
      return data.Remaining + data.Credits + data.Expense + data.OverExpenses ;
    }
  }
  

}
// Utility function to sum up the data values for a single category
