import './ParentCrud.css'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
function ParentCrud(props) {


    const [parentView, setParentView] = useState(false)

    const [parents, setParents] = useState([]);

    const [students, setStudents] = useState([]);

    const [selectedParent, setSelectedParent] = useState({});

    const [creating, setCreating] = useState(false);

    const [allAllowances, setAllAllowances] = useState({});


    const [funds, setFunds] = useState([]);


    useEffect(() => {
        loadParents();

        loadFunds();

    }, [])


    useEffect(() => {
        console.log('students: ', students);
        console.log('parents', parents);
        console.log('allowances', allAllowances)
    }, [students, parents, allAllowances])

    function loadFunds() {

        console.log('fetching funds...');
        axios.get('http://localhost:5000/read/funds').then((res) => {
            if (res.status == 200) {
                console.log('funds retrieved.', res.data);
                setFunds(res.data);
            } else {
                console.log('failed to retrieve funds.')
            }
        })
    }

    async function loadParents() {
        console.log('loading parents...');
        await axios.get('http://localhost:5000/read/parents').then((res) => {
            if (res.status == 200) {
                console.log('parents loaded: ', res.data);
                setParents(res.data)
            } else {
                console.log('parents failed to load');

            }


        })
    }

    async function loadStudents(id) {

        console.log('loading students...')
        await axios.get(`http://localhost:5000/read/studentsByParentId?parentId=${id}`).then(async (res) => {

            if (res.status == 200) {
                console.log('students loaded: ', res.data);
                setStudents(res.data);

                loadStudentsAllowances(res.data);

            } else {
                console.log('failed to load students')
            }

        })
    }


    function loadStudentsAllowances(students) {

        let newAllAllowanes = structuredClone(allAllowances);

        students.forEach(async (student) => {

            let studentsAllowances = await loadAllowance(student._id);

            console.log('sss')

            if (studentsAllowances) {

                newAllAllowanes[student._id] = studentsAllowances;
            } else {

                newAllAllowanes[student._id] = []
            }
            setAllAllowances(newAllAllowanes);
        })

        console.log('aaaaa')




    }


    async function loadAllowance(studentId) {

        console.log('fetching allowances...')
        let res = await axios.get(`http://localhost:5000/read/allowancesByStudentId?studentId=${studentId}`)

        if (res.status == 200) {
            console.log('recieved allowances: ', res.data);
            return res.data
        } else {
            console.log('failed to retrieve allowances.')
        }



    }



    function handleAddParent() {
        let id = String(Math.floor(Math.random() * 100))
        setSelectedParent({ _id: id, firstname: '', lastname: '' })
        setParentView(true);
        setCreating(true)
    }

    function handleAddStudent() {


        let newStudents = structuredClone(students);

        let id = String(Math.floor(Math.random() * 100))

        newStudents.push({ _id: id, firstname: '', lastname: '' });

        let newAllAllowanes = structuredClone(allAllowances);

        newAllAllowanes[id] = [];
        setAllAllowances(newAllAllowanes);
        setStudents(newStudents)
    }


    function handleAddAllowance(e) {


        let studentId = e.target.parentElement.querySelector('[self-id]').getAttribute('self-id')

        let newAllAllowanes = structuredClone(allAllowances);

        let selfId = String(Math.floor(Math.random() * 100));

        newAllAllowanes[studentId].push({ _id: selfId, sourceId: undefined, balance: '' });

        setAllAllowances(newAllAllowanes);

    }

    function handleValueChange(e) {

        let group = e.target.getAttribute('group-name');

        let name = e.target.getAttribute('name');

        let selfId = e.target.getAttribute('self-id')


        console.log('value change for: ', group, 'key name: ', name)

        if (group == 'parents') {

            let newParent = structuredClone(selectedParent);


            newParent[name] = e.target.value;

            setSelectedParent(newParent);

            let newParents = structuredClone(parents);

            newParents[name] = e.target.value;

            setParents(newParents);

        }
        else if (group == 'students') {

            let newStudents = structuredClone(students);

            newStudents.forEach((student) => {
                if (student._id == selfId) {
                    student[name] = e.target.value;
                    setStudents(newStudents)
                }
            })

        }
        else if (group == 'allowances') {

            let newAllAllowances = structuredClone(allAllowances);

            let studentId = e.target.getAttribute('student-id');

            newAllAllowances[studentId].forEach((allowance, index) => {
                if (allowance._id == selfId) {

                    newAllAllowances[studentId][index][name] = e.target.value;

                    setAllAllowances(newAllAllowances);

                }
            })

        }

    }


    function handleParentSelect(e) {

        console.log('parent selected.')
        parents.forEach((parent) => {

            console.log(e, 'a')

            if (e.target.getAttribute('parent-id') == parent._id) {
                loadStudents(parent._id).then(() => {


                    setSelectedParent(parent);
                    console.log('selected parent', parent)

                    setParentView(true);
                });

            }
        })

    }


    function handleSave() {


        if (creating) {

            console.log('aaa', allAllowances, selectedParent._id)

            axios.post('http://localhost:5000/create/parent', { parent: selectedParent, students: students, allowances: allAllowances }).then((res) => {

                console.log(res)

                setCreating(false);

                setParentView(false);
                loadParents();
                setSelectedParent({});
                setAllAllowances({});
                setStudents([])
            })

        } else {

            axios.post('http://localhost:5000/update/parent', { parent: selectedParent, students: [] })
        }


    }


    function handleCancel() {
        setCreating(false);
        setParentView(false);
        setSelectedParent({});
        setStudents([]);
        setAllAllowances({});
        loadParents();
    }


    function handleDelete(e) {

        console.log('deleting parent...')
        axios.post('http://localhost:5000/delete/parent', { parent: selectedParent }).then((res) => {
            if (res.status == 200) {
                console.log('parent deleted.');
                setCreating(false);
                setSelectedParent({});
                setAllAllowances({});
                setStudents([]);
                setParentView(false);
                loadParents();
            } else {
                console.log('failed to delete parent.')
            }
        })

    }


    function handleRemove(e) {


        let id = e.target.parentElement.querySelector('[self-id]').getAttribute('self-id')
        let group = e.target.parentElement.querySelector('[group-name]').getAttribute('group-name');

        console.log(group, id)
        if (group == 'students') {

            let newStudents = structuredClone(students);

            newStudents.forEach((student, index) => {
                if (student._id == id) {
                    newStudents.splice(index, 1);
                }
            })

            setStudents(newStudents)
        } else if (group == 'allowances') {



            let newAllAllowances = structuredClone(allAllowances);

            let studentId = e.target.parentElement.querySelector('[student-id]').getAttribute('student-id');

            newAllAllowances[studentId].forEach((allowance, index) => {
                if (allowance._id == id) {
                    console.log('removing: ', newAllAllowances[studentId], 'at: ', index);
                    newAllAllowances[studentId].splice(index, 1)
                    setAllAllowances(newAllAllowances);
                }
            })
        }
    }




    return (<div className='parent-crud'>

        {
            parentView ? (
                <div className='parent'>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                    {
                        !creating ? (
                            <button onClick={handleDelete}>Delete</button>

                        ) : (<></>)
                    }
                    <button onClick={handleAddStudent}>Add Student</button>
                    <div className='parent-info'>
                        <input group-name="parents" self-id={selectedParent._id} name="username" placeholder='username' value={selectedParent.username} onChange={handleValueChange} />
                        <input group-name="parents" self-id={selectedParent._id} name="firstname" placeholder='firstname' value={selectedParent.firstname} onChange={handleValueChange} />
                        <input group-name="parents" self-id={selectedParent._id} name="lastname" placeholder="lastname" value={selectedParent.lastname} onChange={handleValueChange} />
                        <input type='date' group-name="parents" self-id={selectedParent._id} name="dob" placeholder="birthday" value={selectedParent.dob} onChange={handleValueChange} />

                    </div>
                    <div className='students'>
                        {
                            students.map((student, index) => {
                                return (<div className='student' key={index}>
                                    <h3>Student</h3>
                                    <button onClick={handleAddAllowance}>Add Allowance</button>
                                    <button onClick={handleRemove}>Remove</button>
                                    <br></br>
                                    <input name='firstname' group-name="students" self-id={student._id} parent-id={selectedParent._id} onChange={handleValueChange} value={student.firstname} placeholder='firstname' />
                                    <input name='lastname' group-name="students" self-id={student._id} parent-id={selectedParent._id} onChange={handleValueChange} value={student.lastname} placeholder='lastname' />
                                    <input type='date' name='dob' group-name="students" self-id={student._id} parent-id={selectedParent._id} onChange={handleValueChange} value={student.dob} placeholder='dob' />
                                    <div className='allowances'>



                                        {
                                            allAllowances[student._id] ? (<>
                                                {
                                                    allAllowances[student._id].map((allowance, index1) => {

                                                        console.log('bbb', allowance)

                                                        return (
                                                            <div key={index1} className='allowance'>
                                                                <h4>Allowance</h4>
                                                                <button onClick={handleRemove}>Remove</button><br></br>
                                                                <SelectFund index1={index1} funds={funds} handleValueChange={handleValueChange} allowance={allowance} allAllowances={allAllowances} student={student} />

                                                                <input key={allowance._id + 'balance'} name='balance' group-name='allowances' self-id={allowance._id} student-id={student._id} onChange={handleValueChange} value={allAllowances[student._id][index1]['balance']} placeholder="balance" />

                                                            </div>

                                                        )





                                                    })
                                                }</>
                                            ) : (<></>)

                                        }
                                    </div>
                                </div>

                                )
                            })
                        }
                    </div>
                </div>

            ) : (
                <div className='parents'>
                    <button onClick={handleAddParent}>New Parent</button>
                    {
                        parents.map((parent, index) => {
                            return (
                                <div key={index} parent-id={parent._id} className='parent' onClick={handleParentSelect}>
                                    <div className='parent-info' style={{ pointerEvents: 'none' }}>
                                        <div className='data-field-container'>

                                            <div className='data-field-name'>
                                                Email
                                            </div>
                                            <div className='data-field-value'>
                                                {parent.username}
                                            </div>

                                        </div>
                                        <div className='data-field-container'>

                                            <div className='data-field-name'>
                                                First Name
                                            </div>
                                            <div className='data-field-value'>
                                                {parent.firstname}
                                            </div>

                                        </div>

                                        <div className='data-field-container'>

                                            <div className='data-field-name'>
                                                Last Name
                                            </div>
                                            <div className='data-field-value'>
                                                {parent.lastname}
                                            </div>

                                        </div>

                                        <div className='data-field-container'>

                                            <div className='data-field-name'>
                                                Birthday
                                            </div>
                                            <div className='data-field-value'>
                                                {parent.dob}
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            )


        }






    </div>)
}


function SelectFund(props) {

    const [value, setValue] = useState(props.funds[0]._id)

    return (
        <select key={props.allowance._id} name='sourceId' group-name='allowances' self-id={props.allowance._id} student-id={props.student._id} onChange={props.handleValueChange} defaultValue={value} placeholder="source">
            {
                props.funds.map((fund, index2) => {
                    return (
                        <option key={index2} value={fund._id}>
                            {fund.name}
                        </option>
                    )
                })
            }
        </select>
    )
}


export default ParentCrud






