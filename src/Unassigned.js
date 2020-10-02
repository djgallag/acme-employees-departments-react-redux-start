import React from 'react';
import { connect } from 'react-redux';
import Employees from './Employees';

const Unassigned = ({ department, employees })=> {
    return (
      <li>
        <span className='department-title'>
            Employees Without Departments ({
            employees.filter( employee => !employee.departmentId).length
          })
        </span>
        <Employees
          department={ department }
          employees ={ employees=employees.filter(employee => !employee.departmentId) }
        />
      </li>
    );
};

const mapState = ({ departments, employees }) => {
  return {
    departments,
    employees
  };
}

export default connect(mapState)(Unassigned);
