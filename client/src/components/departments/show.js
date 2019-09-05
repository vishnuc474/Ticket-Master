import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';
import { Card, Button, Row, Col, Container, CardTitle } from 'reactstrap';

class DepartmentShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            department: {}
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            const id = this.props.match.params.id
            axios.delete(`/departments/${id}`)
                .then(response => {
                    this.props.history.push('/departments')
                })
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/departments/${id}`)
            .then(response => {
                const department = response.data
                this.setState(() => ({
                    department: department
                }))
            })
    }

    render() {
        return (
            <div >
                <Container style={{ marginTop: '70px' }}>
                    <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                        <Card>
                            <CardTitle>
                                <h3>{this.state.department.name || ''}</h3>
                            </CardTitle>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col sm={{ size: 'auto', offset: 3 }}>
                                    <Button style={{ width: '100px' }} color='primary'>
                                        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/departments/edit/${this.state.department._id}`}>
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

export default DepartmentShow