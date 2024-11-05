import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-d3charts-ag',
  standalone: true,
  imports: [],
  templateUrl: './d3charts-ag.component.html',
  styleUrl: './d3charts-ag.component.css'
})
export class D3chartsAgComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  private categories = ['Budget 3', 'ggdfgdfg', 'Pranav 1', 'Test 22', 'Test new', 'Utt 1', 'werwer'];
  private totalRemaining = [4201, 25472, 3800, 4750, 2990, 3800, 7836];
  private totalCredits = [2000, 1400, 0, 8120, 740, 0, 120];
  private totalExpense = [4545, 2450, 0, 7120, 1500, 0, 434]; // Replace nulls with 0 for calculations
  private totalOverExpenses = [0, 0, 0, 0, 0, 0, 0]; // Replace nulls with 0
  private colors=['#FF5349', '#1f77b4', '#66d97e', '#ff7f1f']

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.createChart()
  }

  
  createChart(): void {
    const data = this.categories.map((category, i) => ({
      category,
      Remaining: this.totalRemaining[i] || 0,
      Credits: this.totalCredits[i] || 0,
      Expense: this.totalExpense[i] || 0,
      OverExpenses: this.totalOverExpenses[i] || 0
    }));
    console.log(data)
    
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = element.offsetHeight - margin.top - margin.bottom;

    d3.select(element).select('svg').remove();

    const svg = d3.select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


    const seriesNames = ['OverExpenses', 'Expense', 'Credits', 'Remaining'];

    const color = d3.scaleOrdinal()
    .domain(seriesNames)
    .range(this.colors);


    // X and Y Scales
      const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width-margin.right])
      .padding(0.5);

      // X and Y Scales
    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - 0, margin.top]);

    // Stack the data
    const stack = d3.stack()
      .keys(seriesNames)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetExpand);

      const stackedData = stack(data as any);


      // X Axis
    svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x));

      // Y Axis
      svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).tickFormat(d3.format('.0%')));

      const bars = svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .enter().append('g')
      .attr('fill', d => color(d.key) as any);

      bars.selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d: any) => x(d.data.category)!)
      .attr('y', height) // Start at the bottom
      .attr('height', 0) // Initial height
      .attr('width', x.bandwidth())
      .transition()
    .duration(1200)
    .attr('y', (d: any) => y(d[1]))
    .attr('height', (d: any) => y(d[0]) - y(d[1]));

    
    bars.selectAll('text')
    .data(d => d)
    .enter().append('text')
    .attr('x', (d: any) => x(d.data.category)! + x.bandwidth() / 2) // Center text horizontally
    .attr('y', height) // Start off-screen
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('opacity', 0) // Start invisible
    .attr('transform', (d: any) => `rotate(-90, ${x(d.data.category)! + x.bandwidth() / 2}, ${y(d[0]) + (y(d[1]) - y(d[0])) / 2})`) // Rotate text 90 degrees
    .text((d: any) => {
      const value = (d[1] - d[0]) * this.totalValue(d.data);
      return value > 0 ? `$ ${d3.format(',.2f')(value)}` : '';
    }) // Display the value within the segment
    .style('fill', '#000') // Text color
    .style('font-size', '12px')
    .style('font-weight', 'bold')
    .style('pointer-events', 'none') // Ensure text doesn't interfere with mouse events
    .transition()
    .duration(800)
    .attr('y', (d: any) => y(d[0]) + (y(d[1]) - y(d[0])) / 2) // Animate text into position
    .attr('opacity', 1);

    // Tooltip events
  svg.selectAll('rect')
  .on('mouseover', function(event, d: any) {
    const category = d.data.category;
    const total = d3.sum(seriesNames, key => d.data[key]);

    // Aggregate data for the hovered category
    const values = seriesNames.map(key => {
      const value = d.data[key];
      const percentage = (value / total * 100).toFixed(2);
      return value > 0 ? `<span style="color:${color(key)}">${key}: $ ${d3.format(',.2f')(value)} (${percentage}%)</span><br/>` : '';
    }).join('');

    d3.select('#tooltip-text')
      .html(`${category}:<br/>${values}`);

    d3.select('#tooltip')
      .style('left', `${event.pageX - 70}px`)
      .style('top', `${event.pageY - 90}px`)
      .classed('show', true);
  })
  .on('mouseout', () => d3.select('#tooltip').classed('show', false));

  }

  private totalValue(data: any): number {
    return data.Remaining + data.Credits + data.Expense + data.OverExpenses;
  }

  

}
