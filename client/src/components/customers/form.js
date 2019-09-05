import React from 'react'
import { Card, Button, Form, Input, Col, Container } from 'reactstrap';

class CustomerForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.isEdit ? props.customer.name : '',
            email: props.isEdit ? props.customer.email : '',
            mobile: props.isEdit ? props.customer.mobile : ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(e) {
        const name = e.target.value
        this.setState({ name })
    }

    handleEmailChange(e) {
        const email = e.target.value
        this.setState({ email })
    }

    handleMobileChange(e) {
        const mobile = e.target.value
        this.setState({ mobile })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div >
                <Container style={{ marginTop: '70px' }}>
                    <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                        <Card>
                            <h3 style={{ marginTop: '20px' }}>Add/Edit Customer</h3>
                            <Form onSubmit={this.handleSubmit} >
                                <label> Name
                                    <Input type='text' onChange={this.handleNameChange} value={this.state.name} />
                                </label><br />
                                <label> Email
                                    <Input type='email' onChange={this.handleEmailChange} value={this.state.email} />
                                </label><br />
                                <label> Mobile
                                    <Input type='text' onChange={this.handleMobileChange} value={this.state.mobile} />
                                </label><br />
                                <Button color='primary' style={{ marginBottom: '20px' }}>Submit</Button>
                            </Form>
                        </Card>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default CustomerForm