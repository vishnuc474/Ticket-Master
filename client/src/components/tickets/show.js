import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';
import { Card, Button, Row, Col, Container, CardTitle } from 'reactstrap';

class TicketShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ticket: {},
            isLoading: true
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            const id = this.props.match.params.id
            axios.delete(`/tickets/${id}`)
                .then(response => {
                    this.props.history.push('/tickets')
                })
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/tickets/${id}`)
            .then(response => {
                const ticket = response.data
                this.setState(() => ({
                    ticket,
                    isLoading: false
                }))
            })
    }

    render() {
        return (
            <div className='page-content'>
                {(!this.state.isLoading) &&
                    <div>
                        <Container style={{ marginTop: '70px' }}>
                            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardTitle style={{ marginTop: '20px' }}>
                                        <h3>{this.state.ticket.ticketCode}</h3>
                                    </CardTitle>
                                    <p>Status : {this.state.ticket.isCompleted ? 'Closed' : 'Open'}</p>
                                    <p>Opened By : {this.state.ticket.customer.name}</p>
                                    <p>Assigned to : {this.state.ticket.employee.name}</p>
                                    <p>Department : {this.state.ticket.department.name}</p>
                                    <Row style={{ marginBottom: '20px' }}>
                                        <Col sm={{ size: 'auto', offset: 3 }}>
                                            <Button style={{ width: '100px' }} color='primary'>
                                                <Link style={{ color: 'white', textDecoration: 'none' }} to={`/tickets/edit/${this.state.ticket._id}`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                        </Col>
                                        <Col sm={{ size: 'auto', offset: 0.5 }}>
                                            <Button style={{ width: '100px' }} color='primary' onClick={this.handleRemove}>Remove</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Container>
                    </div>
                }
            </div>
        )
    }
}

export default TicketShow