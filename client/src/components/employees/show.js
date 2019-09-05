import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';
import { Card, Button, Row, Col, Container, CardTitle } from 'reactstrap';

class EmployeeShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            employee: {},
            isLoading: true
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            const id = this.props.match.params.id
            axios.delete(`/employees/${id}`)
                .then(response => {
                    this.props.history.push('/employees')
                })
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/employees/${id}`)
            .then(response => {
                const employee = response.data
                this.setState(() => ({
                    employee,
                    isLoading: false
                }))
            })
    }

    render() {
        return (
            <div>
                {!this.state.isLoading &&
                    <div>
                        <Container style={{ marginTop: '70px' }}>
                            <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                                <Card>
                                    <CardTitle style={{ marginTop: '20px' }}>
                                        <h3>{this.state.employee.name}</h3>
                                    </CardTitle>
                                    <p>Email : {this.state.employee.email}</p>
                                    <p>Mobile : {this.state.employee.mobile}</p>
                                    <p>Department : {this.state.employee.department.name}</p>
                                    <Row style={{ marginBottom: '20px' }}>
                                        <Col sm={{ size: 'auto', offset: 3 }}>
                                            <Button style={{ width: '100px' }} color='primary'>
                                                <Link style={{ color: 'white', textDecoration: 'none' }} to={`/employees/edit/${this.state.employee._id}`}>
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
            </div>)
    }
}

export default EmployeeShow