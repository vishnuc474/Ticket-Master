import React from 'react'
import EmployeeForm from './form'
import axios from '../../config/axios'

class EmployeeNew extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('/employees', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/employees')
                }

            })
    }

    render() {
        return (
            <div>
                <EmployeeForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default EmployeeNew