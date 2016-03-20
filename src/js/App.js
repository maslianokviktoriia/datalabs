import React, { Component } from 'react';

import BubbleChart from './BubbleChart';
import BarChart from './BarChart';
import EmployeeInfo from './EmployeeInfo';
import dummyData from './data';

import '../scss/style.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.clicks = 0;

    this.state = {
      activeChart: 'bar',
      info: undefined,
      filter: 'all',
      items: dummyData.map((item, i) => ({
        name: item.Name,
        country: item.Country,
        age: item.Age,
        gender: item.Gender,
        compensation: item.Compensation,
        selected: false,

        // Data needed for bubble chart
        _id: i,
        displayText: item.Name,
        value: item.Compensation,
        colorValue: item.Gender === 'female' ? -1 : 1,
      })),
    };

    this.onClick = this.onClick.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.onChangeChart = this.onChangeChart.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.filterItems);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.filterItems);
  }

  onClick(data) {
    this.clicks++;
    if (this.clicks === 1) {
      setTimeout(() => {
        if (this.clicks === 1) {
          // single click
          const items = this.state.items;
          this.setState({
            items: items.map(item => {
              if (item._id === data._id) {
                return Object.assign({}, item, { selected: !item.selected });
              }
              return item;
            }),
          });
        } else {
          // double click
          this.setState({
            info: data,
          });
        }
        this.clicks = 0;
      }, 200);
    }
  }

  onChangeChart(type) {
    return () => {
      this.setState({
        activeChart: type,
      });
    };
  }

  clearSelection() {
    const items = this.state.items;
    this.setState({
      items: items.map(item => {
        if (item.selected) {
          return Object.assign({}, item, { selected: false });
        }
        return item;
      }),
      info: undefined,
      filter: 'all',
    });
  }

  closeInfo() {
    this.setState({
      info: undefined,
    });
  }

  filterItems(evt) {
    if (evt.charCode === 13) {
      this.setState({
        filter: this.state.filter === 'all' ? 'selected' : 'all',
      });
    }
  }

  render() {
    const { items, activeChart, info, filter } = this.state;
    const selectedItems = items.filter(item => item.selected);
    const itemsToDisplay = filter === 'all' ? items : selectedItems;
    return (
      <div>
        <div className="actions">
          <div className="chartSwitcher">
            <button
              className={'btn btn-default ' + (activeChart === 'bar' ? 'active' : '')}
              onClick={this.onChangeChart('bar')}
            >Bar chart</button>
            <button
              className={'btn btn-default ' + (activeChart === 'bubble' ? 'active' : '')}
              onClick={this.onChangeChart('bubble')}
            >Bubble chart</button>
          </div>
          <div className="clearAll">
            <button className="btn btn-default" onClick={this.clearSelection}>Clear all</button>
          </div>
          <div className="selectedCount">
            Selected {selectedItems.length}/{items.length}
          </div>
        </div>
        {activeChart === 'bar' &&
          <BarChart data={itemsToDisplay} onClick={this.onClick} />}
        {activeChart === 'bubble' &&
          <BubbleChart data={itemsToDisplay} onClick={this.onClick} />}
        {info && <EmployeeInfo data={info} onClose={this.closeInfo} />}
      </div>
    );
  }
}

export default App;
