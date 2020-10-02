import React from 'react';
import { connect } from 'react-redux';
import { destroyEmployee, updateEmployee } from './store'

class Employee extends React.Component {
  render() {
    return (
      <li key={ this.props.employee.id }>
        { this.props.employee.name }
        <button onClick={ ()=> this.props.destroyEmployee(this.props.employee)}>x</button>
        {
          this.props.employee.departmentId && (
            <button onClick={ ()=> this.props.removeFromDepartment({ name: this.props.employee.name, id: this.props.employee.id, departmentId: null })}>Remove From Department</button>
          )
          }
      </li>
    );
  }
};

const mapDispatch = dispatch => {
  return {
    destroyEmployee: (id) => dispatch(destroyEmployee(id)),
    removeFromDepartment: (employee) => dispatch(updateEmployee(employee))
  }
}

export default connect(null, mapDispatch)(Employee);
