import React from 'react'
import DepartmentForm from './form'
import axios from '../../config/axios'

class DepartmentNew extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('/departments', formData)
            .then(response => {
                console.log(response.data)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/departments')
                }

            })
    }

    render() {
        return (
            <div>
                <h2>Add Department</h2>
                <DepartmentForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default DepartmentNew