import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './form'

class DepartmentEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            department: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`)
            .then(response => {
                const department = response.data
                this.setState(() => ({
                    department: department,
                    isLoading: false
                }))
            })
    }

    handleSubmit(formData) {
        const id = this.props.match.params.id
        axios.put(`/departments/${id}`, formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push(`/departments/show/${id}`)
                }

            })
    }
    
    render() {
        return (
            <div className='page-content'>
                {(!this.state.isLoading) && <DepartmentForm department={this.state.department} isEdit={true} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default DepartmentEdit