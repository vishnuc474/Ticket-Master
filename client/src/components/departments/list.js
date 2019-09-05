import React from 'react';
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import DepartmentForm from './form'
import { Table, Button } from 'reactstrap'
import { FaPlusSquare } from "react-icons/fa"

class DepartmentList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            departments: [],
            isNew: false
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleAdd() {
        this.setState((prevState) => ({
            isNew: true
        }))
    }

    handleSubmit(formData) {
        axios.post('/departments', formData)
            .then(response => {
                console.log(response.data)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    axios.get('/departments')
                        .then(response => {
                            const departments = response.data
                            this.setState(() => ({
                                departments: departments,
                                isNew: false
                            }))
                        })
                }
            })
    }

    componentDidMount() {
        axios.get('/departments')
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
            .catch(err => {
                // console.log(err)
                this.props.history.push('/users/login')
            })
    }

    render() {
        return (
            <div className='page-content'>
                <h3>Departments</h3>
                <Button style={{ backgroundColor: 'green', marginBottom: '10px' }} onClick={this.handleAdd}><FaPlusSquare size={22} style={{ paddingRight: '5px' }} />Add Department</Button>
                {this.state.isNew && <DepartmentForm handleSubmit={this.handleSubmit} />}
                {this.state.departments.length != 0 ?
                    <Table striped bordered style={{ width: '1000px' }}>
                        <thead style={{ fontWeight: 'bold' }}>
                            <tr>
                                <td>Name</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.departments.map((department) => {
                                    return (
                                        <tr key={department._id}>
                                            <td><Link to={`/departments/show/${department._id}`}>{department.name}</Link></td>
                                            <td><Link to={`/departments/show/${department._id}`}>show</Link></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </Table> : <p>...Loading</p>}
            </div>
        )
    }
}

export default DepartmentList