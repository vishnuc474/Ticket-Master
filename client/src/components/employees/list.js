import React from 'react';
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import { FaPlusSquare } from "react-icons/fa"

class EmployeeList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get('/employees')
            .then(response => {
                const employees = response.data
                this.setState({ employees })
            })
            .catch(err => {
                this.props.history.push('/users/login')
            })
    }

    render() {
        return (
            <div className='page-content'>
                <h3>Employees</h3>
                <Button style={{ backgroundColor: 'green', marginBottom: '10px' }}><Link style={{ color: 'white', textDecoration: 'none' }} to='/employees/new'><FaPlusSquare size={22} style={{ paddingRight: '5px' }} />Add Employee</Link></Button>

                {
                    this.state.employees.length != 0 ?
                        <Table striped bordered style={{ width: '1000px' }}>
                            <thead style={{ fontWeight: 'bold' }}>
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Mobile</td>
                                    <td>Department</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map((employee) => {
                                        return (
                                            <tr key={employee._id}>
                                                <td><Link to={`/employees/show/${employee._id}`}>{employee.name}</Link></td>
                                                <td>{employee.email}</td>
                                                <td>{employee.mobile}</td>
                                                <td>{employee.department.name}</td>
                                                <td><Link to={`/employees/show/${employee._id}`}>show</Link></td>
                                            </tr>
                                        )
                                    })}

                            </tbody>
                        </Table> : <p>...Loading</p>
                }
            </div >
        )
    }
}

export default EmployeeList