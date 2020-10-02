import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_DEPARTMENTS = 'SET_DEPARTMENTS';

const departmentsReducer = (state = [], action) => {
    if(action.type === SET_DEPARTMENTS) {
        state = action.departments
    }
    return state;
}

const setDepartments = (departments)=> {
    return {
        type: SET_DEPARTMENTS,
        departments
    };
};

const fetchDepartments = ()=> {
    return async(dispatch)=> {
        const response = await axios.get('/api/departments');
        dispatch(setDepartments(response.data));
    };
};

const SET_EMPLOYEES = 'SET_EMPLOYEES';
const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE';

const employeesReducer = (state = [], action)=> {
    if(action.type === SET_EMPLOYEES){
        state = action.employees
    }
    if(action.type === UPDATE_EMPLOYEE){
        state = state.map(employee => employee.id === action.employee.id ? action.employee : employee);
    }
    if(action.type === CREATE_EMPLOYEE){
        state = [action.employee, ...state];
    }
    if(action.type === DESTROY_EMPLOYEE){
        state = state.filter(employee => employee.id !== action.id*1);
    }
    return state;
};

const setEmployees = (employees)=> {
    return {
        type: SET_EMPLOYEES,
        employees
    };
};

const fetchEmployees = ()=> {
    return async(dispatch)=> {
        const response = await axios.get('/api/employees');
        dispatch(setEmployees(response.data));
    };
};

const _updateEmployee = (employee)=> {
    return {
        type: UPDATE_EMPLOYEE,
        employee
    };
};

const updateEmployee = ({ name, id, departmentId })=> {
    return async(dispatch)=> {
        const response = await axios.put(`/api/employees/${id}`, { name, departmentId });
        dispatch(_updateEmployee(response.data));
    };
};

const _createEmployee = (employee)=> {
    return {
        type: CREATE_EMPLOYEE,
        employee
    };
};

const createEmployee = ({ name })=> {
    return async(dispatch)=> {
        const response = await axios.post('/api/employees', { name });
        dispatch(_createEmployee(response.data));
    };
};

const _destroyEmployee = (id)=> {
    return {
        type: DESTROY_EMPLOYEE,
        id
    };
};

const destroyEmployee = ({ id })=> {
    return async(dispatch)=> {
        await axios.delete(`/api/employees/${id}`);
        dispatch(_destroyEmployee(id));
    };
};

const reducer = combineReducers({
    employees: employeesReducer,
    departments: departmentsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchDepartments, fetchEmployees, updateEmployee, destroyEmployee, createEmployee };