import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './apps/Login/Login.jsx'
import VendorApplication from './apps/VendorApplication/VendorApplication.jsx';
import Parent from './apps/Parent/Parent.jsx';
import Admin from './apps/Admin/Admin.jsx';
import AdminDashboard from './pages/AdminCrud/AdminCrud.jsx';
import AdminCrud from './pages/AdminCrud/AdminCrud.jsx'
import ParentCrud from './pages/ParentCrud/ParentCrud.jsx';
import FundCrud from './pages/FundCrud/FundCrud';
import Shop from './pages/Shop/Shop';
import Tutors from './pages/Tutors/Tutors';
import Schools from './pages/Schools/Schools';
import List from './components/List/List';
import ApplicationApproval from './pages/ApplicationApproval/ApplicationApproval';
import VendorCrud from './pages/VendorCrud/VendorCrud';
import Activation from './apps/Activation/Activation';
function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  console.log('change', Date.now())

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/parent'>
            <Route path=':id' element={<Parent/>}>

            {/* <Route path="dashboard" element={<></>}/>
            <Route path="shop" element={<Shop/>}/>
            <Route path="tutors" element={<Tutors/>}/>
            <Route path="schools" element={<Schools/>}/> */}

            </Route>
          </Route>
          <Route path='/admin' element={<Admin/>}>
            <Route path='admins' element={<AdminCrud/>}/>
            <Route path='parents' element={<ParentCrud/>}/>
            <Route path='funds' element={<FundCrud/>}/>
            <Route path='applications' element={<ApplicationApproval/>}/>
            <Route path='vendors' element={<VendorCrud/>}/>

          </Route>
          <Route path='/vendorApplication' element={<VendorApplication/>}/>
          <Route path='/activateAccount/:activationLink' element={<Activation/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
