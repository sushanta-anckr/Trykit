import { Component, VERSION } from '@angular/core';

import * as d3 from 'd3';
import { Arc, DefaultArcObject } from 'd3';

export interface SimpleDataModel {
  name: string;
  value: string;
  color?: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css'
})
export class DonutChartComponent {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    this.bindChart();
 
   }

  bindChart() {
    var datatest = [
      { name: 'Work Hours', value: 60, color: '#8CC63E' },

      { name: 'Non-Work Hours', value: 7.45, color: '#29AAE3' },

      { name: 'Over Time', value: 11, color: '#23B574' },

      { name: 'Project Count', value: 40, color: '#296972' },
    ];
    const tooltip = d3.select('#tooltip');
    var width = Math.min(300, window.innerWidth * 0.5)
     var height = width;

    var outerRadius = width / 2;
    var innerRadius = outerRadius * 0.6;
    var pie1 = d3
      .pie()
      .value((d: any) => {
        return d.value;
      })
      .sort(null);

    let arc: Arc<any, DefaultArcObject> = d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .cornerRadius(0)
      .padAngle(0);

    var outerArc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

    var svg: any = d3
      .select('#chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)  // Proportional scaling
      .attr('preserveAspectRatio', 'xMidYMid meet')  // Center the chart and scale appropriately
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg.append('g').attr('class', 'slices');
    svg.append('g').attr('class', 'labelName');
    svg.append('g').attr('class', 'lines');

    var path = svg
      .selectAll('path')
      .data(pie1(datatest as any))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d:any) {
        return d.data.color;
      }).on('mouseover', (event:any, d:any) => {
        let color = '#4D98B1'

        tooltip
          .html(`${d.data.name}: ${d.data.value}%`) // Update tooltip content
          .style('left', `${event.pageX + 5}px`) // Position tooltip
          .style('top', `${event.pageY - 28}px`)
          .style('stroke',color)
          .transition()
          .duration(200)
          .style('opacity', 1); // Show tooltip
      }) .on('mousemove', (event:any) => {
        let key = 'Variance';
        let color = '#4D98B1';
        tooltip
          .style('left', `${event.pageX + 5}px`) // Update tooltip position
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', (event:any, d:any) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', 0); // Hide tooltip
      });
    path
      .transition()
      .duration(1000)
      .attrTween('d', function (d:any) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t:any) {
          return arc(interpolate(t));
        };
      });

    var restOfTheData = function () {
      var text = svg
        .selectAll('text')
        .data(pie1(datatest as any))
        .enter()
        .append('text')
        .transition()
        .duration(200)
        .attr('transform', function (d:any) {
          return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('dy', '.4em')
        .attr('text-anchor', 'middle')
        .text(function (d:any) {
          return d.data.value + '%';
        })
        .style('fill', '#fff')
        .style('font-size', `${Math.max(10, width / 30)}px`); 

      var legendRectSize = 20;
      var legendSpacing = 7;
      var legendHeight = legendRectSize + legendSpacing;

      var legend = svg
        .selectAll('.legend')
        .data(datatest)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d:any, i:any) {
          //Just a calculation for x & y position
          return 'translate(-50,' + (i * legendHeight - 55) + ')';
        });
      legend
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('rx', 20)
        .attr('ry', 20)
        .style('fill', function (d:any) {
          return d.color;
        })
        .style('stroke', function (d:any) {
          return d.color;
        })
        .on('mouseover', (event:any, d:any) => {
          // Highlight corresponding donut slice
          d3.selectAll('path')
            .transition()
            .duration(200)
            .style('opacity', (sliceData:any) => (sliceData?.data?.name === d.name ? 1 : 0.3))
            // .attr('transform', (sliceData:any) => (sliceData?.data?.name === d.name ? 'scale(1.1)' : 'scale(1)'));
        })
        .on('mouseout', () => {
          // Reset all slices
          d3.selectAll('path')
            .transition()
            .duration(200)
            .style('opacity', 1)
            .attr('transform', 'scale(1)');
        });

      legend
        .append('text')
        .attr('x', 30)
        .attr('y', 15)
        .text(function (d:any) {
          console.log(d.name);
          return d.name;
        })
        .style('fill', function (d:any) {
          return d.color;
        })
        .style('font-size', `${Math.max(10, width / 30)}px`);
    };

    setTimeout(restOfTheData, 1000);
  }
}
