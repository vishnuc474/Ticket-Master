import React from 'react'
import axios from '../../config/axios'
import CustomerForm from './form';


class CustomerEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customer: {},
            isLoading: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`)
            .then(response => {
                const customer = response.data
                this.setState(() => ({
                    customer: customer,
                    isLoading: false
                }))
            })
    }

    handleSubmit(formData) {
        const id = this.props.match.params.id
        axios.put(`/customers/${id}`, formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push(`/customers/show/${id}`)
                }

            })
    }
    
    render() {
        return (

            <div className='page-content'>

                {(!this.state.isLoading) && <CustomerForm customer={this.state.customer} isEdit={true} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default CustomerEdit