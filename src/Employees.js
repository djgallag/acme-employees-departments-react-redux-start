import React from 'react';
import { connect } from 'react-redux';
import Employee from './Employee';

const Employees = ({ employees })=> {
  return (
      <ul>
        {
          employees.map( employee => <Employee employee={ employee } key={ employee.id }/>)
        }
      </ul>
  );
};

export default Employees;
