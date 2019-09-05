import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import CustomerList from './components/customers/list'
import CustomerNew from './components/customers/new'
import CustomerShow from './components/customers/show'
import CustomerEdit from './components/customers/edit'

import DepartmentList from './components/departments/list'
import DepartmentNew from './components/departments/new'
import DepartmentShow from './components/departments/show'
import DepartmentEdit from './components/departments/edit'

import EmployeeList from './components/employees/list'
import EmployeeShow from './components/employees/show'
import EmployeeNew from './components/employees/new'
import EmployeeEdit from './components/employees/edit'

import TicketList from './components/tickets/list'
import TicketNew from './components/tickets/new'
import TicketShow from './components/tickets/show'
import TicketEdit from './components/tickets/edit'

import './App.css'
import { Navbar, NavbarBrand } from 'reactstrap';



class App extends React.Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <Navbar style={{ backgroundColor: 'black' }} light expand="md">
            <NavbarBrand style={{ color: 'white ', fontSize: '30px', fontFamily: 'Alegra' }}>Ticket-Master</NavbarBrand>
          </Navbar>
          <nav className='sidenav'>
            <Link to='/'>Dash Board</Link>
            <Link to='/customers'>Customers</Link>
            <Link to='/departments'>Departments</Link>
            <Link to='/employees'>Employees</Link>
            <Link to='/tickets'>Tickets</Link>
          </nav>
          

          <Route path='/' component={TicketList} exact={true} />

          <Route path='/customers' component={CustomerList} exact={true} />
          <Route path='/customers/new' component={CustomerNew} exact={true} />
          <Route path='/customers/show/:id' component={CustomerShow} exact={true} />
          <Route path='/customers/edit/:id' component={CustomerEdit} exact={true} />

          <Route path='/departments' component={DepartmentList} exact={true} />
          <Route path='/departments/new' component={DepartmentNew} exact={true} />
          <Route path='/departments/show/:id' component={DepartmentShow} exact={true} />
          <Route path='/departments/edit/:id' component={DepartmentEdit} exact={true} />

          <Route path='/employees' component={EmployeeList} exact={true} />
          <Route path='/employees/show/:id' component={EmployeeShow} exact={true} />
          <Route path='/employees/new' component={EmployeeNew} exact={true} />
          <Route path='/employees/edit/:id' component={EmployeeEdit} exact={true} />

          <Route path='/tickets' component={TicketList} exact={true} />
          <Route path='/tickets/show/:id' component={TicketShow} exact={true} />
          <Route path='/tickets/new' component={TicketNew} exact={true} />
          <Route path='/tickets/edit/:id' component={TicketEdit} exact={true} />

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
