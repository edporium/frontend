import './ParentCrud.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
function ParentCrud(props) {

    const [manipulateView, setManipulateView] = useState(false);
    const [data, setData] = useState([]);
    const [selectedParent, setSelectedParent] = useState({});
    let studentsByParentId = {}

    useEffect(() => {

        loadData();

    }, [])




    function loadData() {
        axios.get('http://localhost:5000/read/parent').then((res) => {
            console.log(res)

            if (res.status == 200) {


                setData(res.data);





            }
        }).then(() => {
            setManipulateView(false)
        })
    }

    function handleParentSelect(e) {
        let id = e.target.getAttribute('objectId');

        data.forEach((object) => {

            if (object._id == id) {

                setSelectedParent((prev) => {

                    setManipulateView(true)

                    return object

                });




            }
        })
    }


    function handleCreateClick() {

        setManipulateView(true)
    }


    function handleCancel() {


        setSelectedParent({})

        setManipulateView(false)
    }


    function handleSave(parent, students, wallets) {


        console.log(parent, students, wallets)
    }


    if (manipulateView) {


        return <ParentManiplator handleSave={handleSave} handleCancel={handleCancel} parent={selectedParent} />


    } else {


        return (<div className='parent-crud'>

            <button onClick={handleCreateClick}>Create</button>

            <div className='read-container'>
                {
                    data.map((parent, index) => {
                        return (
                            <div objectid={parent['_id']} key={parent['_id']} onClick={handleParentSelect} className="data-object">
                                {
                                    Object.keys(parent).map((key, keyIndex) => {

                                        return (
                                            <div key={key + String(parent["_id"])} className="data-prop">
                                                <div className="data-prop-key">{key}</div>
                                                <div className="data-prop-value">{parent[key]}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

            </div>





        </div>)
    }



}



function ParentManiplator(props) {

    const [firstname, setFirstname] = useState('' || props.parent.firstname);

    const [lastname, setLastname] = useState('' || props.parent.lastname);

    const [username, setUsername] = useState('' || props.parent.username);

    const [password, setPassword] = useState('' || props.parent.password);

    const [street, setStreet] = useState('' || props.parent.street);

    const [city, setCity] = useState('' || props.parent.city);

    const [zip, setZip] = useState('' || props.parent.zip);

    const [state, setState] = useState('' || props.parent.state);

    const [dob, setDob] = useState('' || props.parent.dob);

    const [students, setStudents] = useState([]);

    const [wallets, setWallets] = useState([])

    useEffect(() => {

        if (!(Object.keys(props.parent).length == 0)) {

            console.log('loading students')

            axios.get(`http://localhost:5000/read/studentByParentId?parentId=${props.parent._id}`).then((res) => {

                if (res.status == 200) {



                    setStudents(res.data);





                }
            })



        }

    }, []);


    function handleAddStudentClick() {

        let newStudents = new Array();


        students.map((student, index) => {
            
            newStudents[index] = student
        })

        let newStudent = {
            _id:students.length,
            saved:false,
            parentId:props.parent._id?(props.parent._id):(0)
        }

        newStudents.push(newStudent);

        setStudents(newStudents);
    }


    function handleRemove(id) {


        let newStudents = new Array();

        console.log(id)

        students.map((student, index) => {
            if (student._id != id) {

                newStudents[index] = student

            }
        })

        setStudents(newStudents);


    }



    function studentUpdateCallback(newStudent) {

        let newStudents = new Array();

        newStudents = students;

        newStudents.map((student, index) => {
            if (student._id == newStudent._id) {

                newStudents[index] = newStudent

            }
        })
        setStudents(newStudents);



    }

    function handleSaveClick() {


        props.parent.firstname = firstname;

        props.parent.lastname = lastname;

        props.parent.username = username;

        props.parent.password = password;

        props.parent.street = street;

        props.parent.city = city;

        props.parent.zip = zip;

        props.parent.state = state;

        props.parent.dob = dob;

        props.handleSave(props.parent, students, wallets)

    }


    function walletsUpdateCallback(wallets){

        let newWallets = new Array();


        wallets.map((wallet, index)=>{
            newWallets[index] = wallet
        });

        setWallets(newWallets)
    }

    console.log(students)
    return (
        <div className='parent-crud'>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={props.handleCancel}>Cancel</button>
            <button>Delete</button>

            <div className='manipulate-container'>
                <div className='data-object-edit'>
                    <div className='data-prop'>
                        <div className='data-prop-key'>First Name</div>
                        <div className='data-prop-value'><input value={firstname} onChange={(e) => { setFirstname(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Last Name</div>
                        <div className='data-prop-value'><input value={lastname} onChange={(e) => { setLastname(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Username</div>
                        <div className='data-prop-value'><input value={username} onChange={(e) => { setUsername(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Password</div>
                        <div className='data-prop-value'><input value={password} onChange={(e) => { setPassword(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Street</div>
                        <div className='data-prop-value'><input value={street} onChange={(e) => { setStreet(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>City</div>
                        <div className='data-prop-value'><input value={city} onChange={(e) => { setCity(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Zip</div>
                        <div className='data-prop-value'><input value={zip} onChange={(e) => { setZip(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>State</div>
                        <div className='data-prop-value'><input value={state} onChange={(e) => { setState(e.target.value) }} /></div>
                    </div>
                    <div className='data-prop'>
                        <div className='data-prop-key'>Birthday</div>
                        <div className='data-prop-value'><input type='date' value={dob} onChange={(e) => { setDob(e.target.value) }} /></div>
                    </div>
                    <button onClick={handleAddStudentClick}>Add Student</button>
                    <div className='data-object-edit'>

                        {

                            students.map((student, index) => {

                                console.log(student)

                                return <StudentManipulator walletsUpdateCallback={walletsUpdateCallback} studentUpdateCallback={studentUpdateCallback} handleRemove={handleRemove} key={index} student={student} />

                            })
                        }

                    </div>

                </div>

            </div>

        </div>
    )


}




function StudentManipulator(props) {


    const [firstname, setFirstname] = useState('' || props.student.firstname);

    const [lastname, setLastname] = useState('' || props.student.lastname);

    const [dob, setDob] = useState('' || props.student.dob);

    const [wallets, setWallets] = useState([]);

    const [funds, setFunds] = useState([])
    useEffect(() => {

        console.log(props.student)
        if (props.student.saved) {

            axios.get(`http://localhost:5000/read/walletByStudent?studentId=${props.student._id}`).then((res) => {

                if (res.status == 200) {
                    console.log('wallet', res.data)
                    setWallets(res.data);

                    

                } else {

                }

            })


        }
            axios.get('http://localhost:5000/read/fund').then((res) => {

                if (res.status == 200) {

                    setFunds(res.data);
                    console.log(res.data)

                } else {

                }
            })  

        

    }, [])


    useEffect(() => {

        props.student.firstname = firstname;

        props.student.lastname = lastname;

        props.student.dob = dob;

        props.studentUpdateCallback(props.student);

    }, [firstname, lastname, dob])



    function handleAddWallet(){

        let newWallets = new Array();

  
            wallets.map((wallet, index) => {
                    newWallets[index] = wallet;
        
    
            })
      
            let newWallet = {
                _id:newWallets.length,
                studentId:props.student._id?(props.student._id):(newWallets.length),
                saved:false,}

        newWallets.push(newWallet)
        
       

        

        setWallets(newWallets);
    }

    function handleRemoveWallet(id) {


        let newWallets = new Array();

        console.log(id)

        wallets.map((wallet, index) => {
            if (wallet._id != id) {

                newWallets[index] = wallet

            }
        })

        setWallets(newWallets);


    }


    function walletUpdate(newWallet){
        let newWallets = wallets;


        newWallets.map((wallet, index) => {

                if(wallet._id == wallet.id){

                    newWallets[index] = newWallet
                }
     

            
        })

        props.walletsUpdateCallback(wallets)

        setWallets(newWallets);
        
    }
    return (<div className='student-manipulator'>

        <button onClick={() => { props.handleRemove(props.student._id) }}>Remove Student</button>


        <div className='data-object-edit'>
            <div className='data-prop'>
                <div className='data-prop-key'>First Name</div>
                <div className='data-prop-value'><input value={firstname} onChange={(e) => { setFirstname(e.target.value) }} /></div>
            </div>
            <div className='data-prop'>
                <div className='data-prop-key'>Last Name</div>
                <div className='data-prop-value'><input value={lastname} onChange={(e) => { setLastname(e.target.value) }} /></div>
            </div>
            <div className='data-prop'>
                <div className='data-prop-key'>Birthday</div>
                <div className='data-prop-value'><input type='date' value={dob} onChange={(e) => { setDob(e.target.value) }} /></div>
            </div>
            <button onClick={handleAddWallet}>Add Wallet</button>

            {
                wallets.map((wallet, index) => {

                    console.log(funds)

                    return(
                    <WalletManipulator walletUpdate={walletUpdate} handleRemove={handleRemoveWallet} key={index} funds={funds} wallet={wallet} />
                    )
                })
            }
        </div>

    </div>)
}


function WalletManipulator(props) {


    const [source, setSource] = useState([]);

    const [currentBalance, setCurrentBalance] = useState(props.wallet.currentBalance || 0)


    useEffect(()=>{


        props.wallet.source = source;

        props.wallet.balance = currentBalance;

        props.walletUpdate(props.wallet);

    }, [source, currentBalance])

    return (
        <div className='wallet-manipulator'>
            <button onClick={()=>{props.handleRemove(props.wallet._id)}}>Remove Wallet</button>
            <div className='data-object-edit'>
            <div className='data-prop'>
                <div className='data-prop-key'>Source</div>
                <div className='data-prop-value'>
                    <input list='funds' onChange={(e) => { setSource(e.target.value) }}/>
                    <datalist id='funds' value={source}>

                            {
                                props.funds.map((fund, index)=>{
                                    return <option value={fund.name}></option>
                                    
                                })
                            }

                        </datalist>
                    
                
                    </div>
            </div>
            <div className='data-prop'>
                <div className='data-prop-key'>Current Balance</div>
                <div className='data-prop-value'><input type='number' value={currentBalance} onChange={(e) => { setCurrentBalance(e.target.value) }} /></div>
            </div>

            </div>
           

            
        </div>
    )
}

export default ParentCrud