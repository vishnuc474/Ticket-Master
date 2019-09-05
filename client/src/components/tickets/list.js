import React from 'react';
import axios from '../../config/axios'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import { FaPlusSquare } from "react-icons/fa"


class TicketList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tickets: []
        }
    }

    componentDidMount() {
        axios.get('/tickets')
            .then(response => {
                const tickets = response.data
                this.setState({ tickets })
            })
            .catch(err => {
                this.props.history.push('/users/login')
            })
    }

    render() {
        return (
            <div className='page-content'>
                <h3>Tickets</h3>
                <Button style={{ backgroundColor: 'green', marginBottom: '10px' }}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to='/tickets/new'>
                        <FaPlusSquare size={22} style={{ paddingRight: '5px' }} />Add Ticket
                    </Link>
                </Button>
                {
                    this.state.tickets.length != 0 ?
                        <Table striped bordered style={{ width: '1000px' }}>
                            <thead style={{ fontWeight: 'bold' }}>
                                <tr>
                                    <td>TicketCode</td>
                                    <td>Priority</td>
                                    <td>Status</td>
                                    <td>Opened By</td>
                                    <td>Assigned to</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tickets.map((ticket) => {
                                        return (
                                            <tr key={ticket._id}>
                                                <td><Link to={`/tickets/show/${ticket._id}`}>{ticket.ticketCode}</Link></td>
                                                <td>{ticket.priority}</td>
                                                <td>{ticket.isCompleted ? 'Closed' : 'Open'}</td>
                                                <td>{ticket.customer.name}</td>
                                                <td>{ticket.employee.name}</td>
                                                <td><Link to={`/tickets/show/${ticket._id}`}>Show</Link></td>
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

export default TicketList