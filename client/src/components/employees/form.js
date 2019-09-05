import React from 'react'
import axios from '../../config/axios';
import { Card, Button, Form, Input, Col, Container } from 'reactstrap';

class EmployeeForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.isEdit ? props.employee.name : '',
            email: props.isEdit ? props.employee.email : '',
            mobile: props.isEdit ? props.employee.mobile : '',
            department: props.isEdit ? props.employee.department.name : '',
            departments: []
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handleDeptChange = this.handleDeptChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('/departments')
            .then(response => {
                const departments = response.data
                this.setState({ departments })
            })
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

    handleDeptChange(e) {
        const department = e.target.value
        this.setState({ department })
    }

    handleSubmit(e) {
        e.preventDefault()
        let dept
        if (this.state.department != '') {
            dept = this.state.departments.find(department =>
                department.name == this.state.department
            )
        }
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            department: dept._id
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                {this.state.departments.length != 0 ?
                    <Container style={{ marginTop: '70px' }}>
                        <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                            <Card>
                                <h3 style={{ marginTop: '20px' }}>Add/Edit Employee</h3>
                                <Form >
                                    <label> Name
                                        <Input type='text' onChange={this.handleNameChange} value={this.state.name} />
                                    </label><br />
                                    <label> Email
                                        <Input type='email' onChange={this.handleEmailChange} value={this.state.email} />
                                    </label><br />
                                    <label> Mobile
                                        <Input type='text' onChange={this.handleMobileChange} value={this.state.mobile} />
                                    </label><br />
                                    <label> Department
                                        <Input className='select-width' type='select' value={this.state.department} onChange={this.handleDeptChange} >
                                            <option key=''>Select</option>
                                            {
                                                this.state.departments.map(department => {
                                                    return (
                                                        <option key={department._id}>{department.name}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </label><br />
                                    <Button color='primary' onClick={this.handleSubmit} style={{ marginBottom: '20px' }}>Submit</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Container> : <p>..loading</p>}
            </div>
        )
    }
}

export default EmployeeForm