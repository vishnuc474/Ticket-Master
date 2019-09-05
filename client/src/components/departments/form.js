import React from 'react'
import { Button, Form, Input } from 'reactstrap';

class DepartmentForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.isEdit ? props.department.name : ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(e) {
        const name = e.target.value
        this.setState({ name })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
                    <label> Name
                        <Input type='text' onChange={this.handleNameChange} value={this.state.name} />
                    </label><br />
                    <Button color='primary'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default DepartmentForm