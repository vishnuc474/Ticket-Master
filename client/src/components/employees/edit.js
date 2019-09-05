import React from 'react'
import axios from '../../config/axios'
import EmployeeForm from './form';

class EmployeeEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            employee: {},
            isLoading: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`)
            .then(response => {
                const employee = response.data
                this.setState(() => ({
                    employee: employee,
                    isLoading: false
                }))
            })
    }

    handleSubmit(formData) {
        const id = this.props.match.params.id
        axios.put(`/employees/${id}`, formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push(`/employees/show/${id}`)
                }
            })
    }
    
    render() {
        return (
            <div>
                {(!this.state.isLoading) && <EmployeeForm employee={this.state.employee} isEdit={true} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default EmployeeEdit