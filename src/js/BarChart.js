import React, { Component, PropTypes } from 'react';
import d3 from 'd3';

// http://codepen.io/pyche/pen/Bmzds
const axisMargin = 40;
const lineHeight = 20;
const valueMargin = 4;
const width = 800;
let labelWidth = 0;

function update(svg, data, onClick) {
  const height = lineHeight * data.length + axisMargin;
  const barHeight = lineHeight * 0.8;
  const barPadding = lineHeight * 0.2;
  const max = d3.max(data.map(item => item.value));

  // DATA JOIN
  // Join new data with old elements, if any.
  const bar = svg.selectAll('g.bar').data(data);

  // UPDATE
  // Update old elements as needed.
  bar
    .attr('class', d => 'bar ' + (d.selected ? 'selected' : ''))
    .attr('transform', (d, i) =>
      `translate(0 , ${i * (barHeight + barPadding) + barPadding})`);

  // ENTER
  // Create new elements as needed.
  const newBar = bar.enter().append('g');
  newBar
    .attr('class', d => 'bar ' + (d.selected ? 'selected' : ''))
    .attr('cx', 0)
    .attr('transform', (d, i) =>
      `translate(0 , ${i * (barHeight + barPadding) + barPadding})`);

  newBar
    .append('text')
    .attr('class', 'label')
    .attr('y', barHeight / 2)
    .attr('dy', '.35em') // vertical align middle
    .text(d => d.name).each(function getLabelWidth() {
      labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });

  const scale = d3.scale.linear()
    .domain([0, max])
    .range([0, width - labelWidth]);

  const xAxis = d3.svg.axis()
    .scale(scale)
    .tickSize(-height + axisMargin)
    .orient('bottom');

  bar.select('text.label').text(d => d.name);
  bar.select('text.value').text(d => d.value);
  bar.select('rect')
    .on('click', onClick)
    .attr('class', d => 'line ' + d.gender)
    .transition()
    .duration(500)
    .attr('width', d => scale(d.value));

  newBar.append('rect')
    .on('click', onClick)
    .attr('class', d => 'line ' + d.gender)
    .attr('transform', `translate(${labelWidth}, 0)`)
    .attr('height', barHeight)
    .attr('width', 0)
    .transition()
    .duration(500)
    .attr('width', d => scale(d.value));

  newBar.append('text')
    .attr('class', 'value')
    .attr('y', barHeight / 2)
    .attr('dx', -valueMargin + labelWidth) // margin right
    .attr('dy', '.35em') // vertical align middle
    .attr('text-anchor', 'end')
    .text(d => d.value)
    .attr('x', function getText(d) {
      return Math.max(this.getBBox().width + valueMargin, scale(d.value));
    });

  svg.select('g.axis').remove();
  svg.insert('g', ':first-child')
   .attr('class', 'axis')
   .attr('transform', `translate(${labelWidth}, ${height - axisMargin})`)
   .call(xAxis);

  // EXIT
  // Remove old elements as needed.
  const barToRemove = bar.exit();

  barToRemove.selectAll('rect')
      .transition()
      .duration(500)
      .attr('width', 0);

  barToRemove
    .transition()
    .duration(500)
    .remove();
}

export default class BarChartComponent extends Component {
  componentDidMount() {
    const { data, onClick } = this.props;
    const el = this.refs.barChart;

    this.svg = d3.select(el)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    update(this.svg, data, onClick);
  }

  componentDidUpdate() {
    const { data, onClick } = this.props;
    update(this.svg, data, onClick);
  }

  render() {
    const { data } = this.props;
    const height = data.length * 20 + axisMargin;
    return (
      <div
        className="bar-chart"
        style={{ height, width }}
        ref="barChart"
      />
    );
  }
}

BarChartComponent.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};
