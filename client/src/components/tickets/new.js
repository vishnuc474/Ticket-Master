import React from 'react'
import TicketForm from './form'
import axios from '../../config/axios'

class TicketNew extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('/tickets', formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/tickets')
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default TicketNew