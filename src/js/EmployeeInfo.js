import React, { PropTypes } from 'react';

export default class EmployeeInfo extends React.Component {
  render() {
    const { data, onClose } = this.props;
    return (
      <div className="info-wrapper">
        <div className="close" onClick={onClose}>x</div>
        <div>Name: {data.name}</div>
        <div>Country: {data.country}</div>
        <div>Age: {data.age}</div>
        <div>Gender: {data.gender}</div>
        <div>Compensation: {data.compensation}</div>
      </div>
    );
  }
}

EmployeeInfo.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

