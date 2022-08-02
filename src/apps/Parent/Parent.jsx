import Header from "../../components/Header/Header"
import {Link, Outlet, useParams} from 'react-router-dom'
import Nav from '../../components/Nav/Nav.jsx'
import { useState } from "react"
import { useEffect } from "react";
function Parent(props){

    const [selectedStudent, setSelectedStudent] = useState({});

    const [students, setStudents] = useState([])

    let {id} = useParams()

    useEffect(()=>{

        loadStudents()
    }, []);

    console.log(id)

    async function loadStudents() {

        console.log('loading students...')
        await axios.get(`http://localhost:5000/read/studentsByParentId?parentId=${id}`).then(async (res) => {

            if (res.status == 200) {
                console.log('students loaded: ', res.data);
                setStudents(res.data);

                // loadStudentsAllowances(res.data);

            } else {
                console.log('failed to load students')
            }

        })
    }


    return(

        <div className="parent">

            

            <Header>
                <div style={{color:'white'}}>
                Shop For
                </div>
                          <select>
                            {
                                students.map((student, index)=>{
                                    return(
                                        <option value={student._id}>{student.firstname}</option>
                                    )
                                })
                            }
                            
                            </select> 
            </Header>
            <Nav><Link to='/parent/dashboard'>Dashboard</Link>
            <Link to='/parent/orders'>Orders</Link>
            <Link to='/parent/wallets'>Wallets</Link>
            <Link to='/parent/shop'>Shop</Link>
            <Link to='/parent/tutors'>Tutors</Link>
            <Link to='/parent/schools'>Schools</Link>

            </Nav>
            <Outlet/>
            
        </div>
    )
}

export default Parent