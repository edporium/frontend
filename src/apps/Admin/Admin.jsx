import Header from "../../components/Header/Header"
import { Link, Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav.jsx'

function Admin(props) {

    return (<div className="worker">

        <Header>

        </Header>
        <Nav><Link to='/admin/dashboard'>Dashboard</Link>
            <Link to='/admin/orders'>Orders</Link>
            <Link to='/admin/applications'>Applications</Link>
            <Link to='/admin/vendors'>Vendors</Link>
            <Link to='/admin/parents'>Parents</Link>
            <Link to='/admin/admins'>Admins</Link>
            <Link to='/admin/funds'>Funds</Link>



        </Nav>
        <Outlet />
    </div>)
}


export default Admin