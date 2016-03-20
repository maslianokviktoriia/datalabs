import React, { PropTypes } from 'react';
import ReactBubbleChart from 'react-bubble-chart';

const colorLegend = ['#fc9272', '#6baed6'];
const tooltipProps = [{
  css: 'symbol',
  prop: '_id',
}, {
  css: 'value',
  prop: 'value',
  display: 'Compensation',
}, {
  css: 'change',
  prop: 'gender',
  display: 'Gender',
}];

export default class BubbleChart extends React.Component {
  componentDidMount() {
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    return (
      <ReactBubbleChart
        colorLegend={colorLegend}
        data={this.props.data}
        selectedColor="#737373"
        selectedTextColor="#d9d9d9"
        fixedDomain={{ min: -1, max: 1 }}
        onClick={this.props.onClick}
        tooltip
        smallDiameter={40}
        tooltipProps={tooltipProps}
      />
    );
  }
}

BubbleChart.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};

