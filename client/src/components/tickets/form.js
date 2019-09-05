import React from 'react'
import axios from '../../config/axios';
import Select from 'react-select'
import { Card, Button, Form, Input, Col, Container } from 'reactstrap';

export default class TicketForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            departments: [],
            employees: [],
            isCompleted: props.isEdit ? props.ticket.isCompleted : '',
            ticketCode: props.isEdit ? props.ticket.ticketCode : '',
            message: props.isEdit ? props.ticket.message : '',
            priority: props.isEdit ? props.ticket.priority : '',
            isLoading: true,
            customerOptions: [],
            customerSelected: props.isEdit ? { value: props.ticket.customer._id, label: props.ticket.customer.name } : '',
            departmentOptions: [],
            departmentSelected: props.isEdit ? { value: props.ticket.department._id, label: props.ticket.department.name } : '',
            employeeSelected: props.isEdit ? { value: props.ticket.employee._id, label: props.ticket.employee.name } : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleDepartmentSelectChange = this.handleDepartmentSelectChange.bind(this)
        this.handleEmployeeSelectChange = this.handleEmployeeSelectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        axios.get('/customers')
            .then(response => {
                const customers = response.data
                const customerOptions = []
                for (let i = 0; i < customers.length; i++) {
                    customerOptions.push({ value: customers[i]['_id'], label: customers[i]['name'] })
                }
                this.setState(() =>
                    ({
                        customers: customers, customerOptions
                    }))
            })
        axios.get('/departments')
            .then(response => {
                const departments = response.data
                const departmentOptions = []
                for (let i = 0; i < departments.length; i++) {
                    departmentOptions.push({ value: departments[i]['_id'], label: departments[i]['name'] })
                }
                this.setState({ departments, departmentOptions })
            })
        axios.get('/employees')
            .then(response => {
                const employees = response.data
                this.setState(prevState =>
                    ({
                        employees: employees,
                        isLoading: !prevState.isLoading
                    }))
            })
    }

    handleChange(e) {
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectChange(customer) {
        this.setState({ customerSelected: customer })
    }

    handleDepartmentSelectChange(department) {
        this.setState({ departmentSelected: department })
    }

    handleEmployeeSelectChange(employee) {
        this.setState({ employeeSelected: employee })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            ticketCode: this.state.ticketCode,
            message: this.state.message,
            priority: this.state.priority,
            customer: this.state.customerSelected.value,
            department: this.state.departmentSelected.value,
            employee: this.state.employeeSelected.value,
            isCompleted: this.state.isCompleted
        }
        this.props.handleSubmit(formData)
    }

    render() {
        if (this.state.departmentSelected.length !== 0) {
            var filteredEmployees = this.state.employees.filter((employee) => employee.department._id == this.state.departmentSelected['value'])
            var employeeOptions = filteredEmployees.map(employee => ({
                value: employee._id, label: employee.name
            }))
        }
        
        return (
            <div >
                {
                    <Container style={{ marginTop: '70px' }}>
                        <Col sm="12" md={{ size: 6, offset: 3 }} style={{ textAlign: 'center' }}>
                            <Card>
                                <Form>
                                    <label>TicketCode :
                                    <Input type='text' value={this.state.ticketCode} onChange={this.handleChange} name='ticketCode' />
                                    </label><br />

                                    <label>Message :
                                    <Input type='textarea' value={this.state.message} onChange={this.handleChange} name='message' />
                                    </label><br />

                                    <label>Status :
                                    <Input type='select' className={'select-width'} name='isCompleted' value={this.state.isCompleted} onChange={this.handleChange} >
                                            <option value=''>Select</option>
                                            <option value={false}>Open</option>
                                            <option value={true}>Closed</option>
                                        </Input>
                                    </label><br />

                                    <label>Priority :
                                    <Input type='select' className={'select-width'} name='priority' value={this.state.priority} onChange={this.handleChange} >
                                            <option value=''>Select</option>
                                            <option value='High'>High</option>
                                            <option value='Medium'>Medium</option>
                                            <option value='Low'>Low</option>
                                        </Input>
                                    </label><br />
                                    <label>Customers
                                    <Select className={'select-width'} options={this.state.customerOptions} value={this.state.customerSelected} onChange={this.handleSelectChange} />
                                    </label><br />
                                    <label>Departments
                                    <Select className={'select-width'} options={this.state.departmentOptions} value={this.state.departmentSelected} onChange={this.handleDepartmentSelectChange} />
                                    </label><br />
                                    {this.state.departmentSelected &&
                                        <label>Employees
                                        <Select className={'select-width'} options={employeeOptions} value={this.state.employeeSelected} onChange={this.handleEmployeeSelectChange} />
                                        </label>
                                    }<br />
                                    <Button color='primary' onClick={this.handleSubmit} style={{ marginBottom: '20px' }}>Submit</Button>

                                </Form>
                            </Card>
                        </Col>
                    </Container>
                }
            </div>
        )
    }
}