import React from 'react';
import { connect } from 'react-redux';
import Employees from './Employees';

class Department extends React.Component{
  render() {
    return (
      <li>
        <span className='department-title'>
          { this.props.department.name } ({
            this.props.employees.filter( employee => employee.departmentId === (this.props.department ? this.props.department.id : null) ).length
          })
        </span>
        <Employees
          employees ={ this.props.employees.filter(employee => employee.departmentId === this.props.department.id) }
        />
      </li>
    );
  }
};

const mapState = ({  employees }) => {
  return {
    employees
  };
}

export default connect(mapState)(Department);
