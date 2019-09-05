import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';
import { Card, Button, Row, Col, Container, CardTitle } from 'reactstrap';

class CustomerShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customer: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            const id = this.props.match.params.id
            axios.delete(`/customers/${id}`)
                .then(response => {
                    this.props.history.push('/customers')
                })
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`)
            .then(response => {
                const customer = response.data
                this.setState(() => ({
                    customer: customer
                }))
            })
    }

    render() {
        return (
            <div>
                <Container style={{ marginTop: '70px' }}>
                    <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                        <Card>
                            <CardTitle style={{ marginTop: '20px' }}>
                                <h3>{this.state.customer.name || ''}</h3>
                            </CardTitle>
                            <p>Email : {this.state.customer.email || ''}</p>
                            <p>Mobile : {this.state.customer.mobile || ''}</p>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col sm={{ size: 'auto', offset: 3 }}>
                                    <Button style={{ width: '100px' }} color='primary'>
                                        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/customers/edit/${this.state.customer._id}`}>
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
        )
    }
}

export default CustomerShow