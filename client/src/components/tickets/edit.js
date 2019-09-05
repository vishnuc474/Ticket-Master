import React from 'react'
import axios from '../../config/axios'
import TicketForm from './form';

class TicketEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ticket: {},
            isLoading: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`)
            .then(response => {
                const ticket = response.data
                this.setState(() => ({
                    ticket: ticket,
                    isLoading: false
                }))
            })
    }

    handleSubmit(formData) {
        const id = this.props.match.params.id
        axios.put(`/tickets/${id}`, formData)
            .then(response => {
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push(`/tickets/show/${id}`)
                }
            })
    }


    render() {
        return (
            <div className = 'page-content'>
                {(!this.state.isLoading) && <TicketForm ticket={this.state.ticket} isEdit={true} handleSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default TicketEdit