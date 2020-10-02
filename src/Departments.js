import React from 'react';
import { connect } from 'react-redux';
import Department from './Department';
import Unassigned from './Unassigned';

const Departments = ({ departments })=> {
  return (
    <ul className='departments'>
      <Unassigned />
      {
        departments.map( department => {
          return (
            <Department
              key = { department.id }
              department = { department }
            />
          );
        })
      }
    </ul>
  );
}

const mapState = ({ departments }) => {
  return {
    departments
  };
}

export default connect(mapState)(Departments);
