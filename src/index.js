import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Departments from './Departments';
import { Provider, connect } from 'react-redux';
import store, { destroyEmployee, fetchDepartments, fetchEmployees } from './store';

class _App extends React.Component{
  componentDidMount() {
    this.props.loadDepartments();
    this.props.loadEmployees();
  }
  render(){

    return (
      <div>
        <h1>Acme Employees And Departments</h1>
        <div>{ this.props.employees.length } Total Employees</div>
        <Departments />
      </div>
    );
  }
}

const mapState = ({ departments, employees }) => {
  return {
    departments,
    employees
  };
}

const mapDispatch = dispatch => {
  return {
    loadDepartments: () => dispatch(fetchDepartments()),
    loadEmployees: () => dispatch(fetchEmployees())
  };
}

const App = connect(mapState, mapDispatch)(_App);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
