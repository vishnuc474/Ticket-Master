import React from 'react'
import CustomerForm from './form'
import axios from '../../config/axios'

class CustomerNew extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('/customers', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/customers')
                }
            })
    }


    render() {
        return (
            <div className='page-content'>
                <CustomerForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default CustomerNew