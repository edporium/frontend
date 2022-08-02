import { useEffect } from "react";
import { useState } from "react";
import './AdminCrud.css'
import axios from 'axios'
function AdminCrud(props) {


    const objectSchema = {
        firstname:'',
        lastname:'',
        username:'',
        password:''
    }

    const [editView, setEditView] = useState(false);

    const [createView, setCreateView] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);
    const [data, setData] = useState([]);
    


    useEffect(() => {

        loadData()
    }, [])



    function loadData(){

        axios.get('http://localhost:5000/read/admins').then((res) => {
            console.log(res)

            setData(res.data)
        })
    }


    function handleCancel() {

        if (createView) {
            setCreateView(false);

        }
        else if (editView) {
            setEditView(false)

        }
    }


    function saveCreateCallback(admin) {


        let data = {
            admin:admin
        }

        

        axios.post('http://localhost:5000/create/admin', data).then((res)=>{
            console.log(res)

            if(res.status == 200){
                loadData();

                setCreateView(false)

            }
        })
    }


    function SaveEditCallback(admin){

        let data = {
            admin:admin
        }
        data.admin._id = selectedObject._id
        console.log(admin)
        axios.post('http://localhost:5000/update/admin', data).then((res)=>{
            console.log(res.status)

            if(res.status == 200){
                loadData();

                setEditView(false)

            }
        })

    }

    function handleDelete(){

        let data = {
            admin:selectedObject
        }
        axios.post('http://localhost:5000/delete/admin', data).then((res)=>{
            console.log(res.status)

            if(res.status == 200){
                loadData();

                setEditView(false)

            }
        })

    }

    function handleCreate() {
        setCreateView(true);
    }



    function handleCreateCancel(){
        
        setCreateView(false)
    }


    function handleEditCancel(){

        setEditView(false);
    }

    function handleObjectSelect(e){

        let id = e.target.getAttribute('objectId');

        data.forEach((object)=>{

            if(object._id == id){
             
                setSelectedObject((prev)=>{
                    
                    setEditView(true)
                    return object
                
                });



                
            }
        })


     
    }

    if(createView){
        return <AdminCreate objectSchema={objectSchema} saveCreateCallback={saveCreateCallback} handleCreateCancel={handleCreateCancel}/>
    }
    else if(editView){

 return <AdminEdit admin={selectedObject} handleDelete={handleDelete} SaveEditCallback={SaveEditCallback} handleEditCancel={handleEditCancel}/>



    }

    else{
        return (
        
        <div className="admin-crud">
            
          <div className="read">
            <div className="toolbar">
                <button onClick={handleCreate}>Create</button>
                <button onClick={loadData}>Refresh</button>
            </div>
            <div className="read-container">
                {data.map((admin, index)=>{
                    return (
                        <div objectid={admin['_id']} key={admin['_id']} onClick={handleObjectSelect} className="data-object">
                            {
                                Object.keys(admin).map((key, keyIndex)=>{

                                    return(
                                        <div key={key + String(admin["_id"])} className="data-prop">
                                            <div className="data-prop-key">{key}</div>
                                            <div className="data-prop-value">{admin[key]}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
            </div>
            )
    }
}



function AdminCreate(props){


    const [username, setUsername] = useState('');


    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');



    function handleSave(){


        let admin = {

            firstname:firstname,
            lastname:lastname,
            username:username,


            
        }

        props.saveCreateCallback(admin);
    }


    return(
    
        <div className="admin-crud">
  <div className="create">

<div className="toolbar">
    <button onClick={handleSave}>Save</button>
    <button onClick={props.handleCreateCancel} >Cancel</button>
</div>

<div className="create-container">
<input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" />
<input onChange={(e)=>{setFirstname(e.target.value)}} type="text" placeholder="Firstname"/>
<input onChange={(e)=>{setLastname(e.target.value)}} type="text" placeholder="Lastname"/>

</div>
</div>

        </div>
    
  )

}



function AdminEdit(props){

    const [username, setUsername] = useState(props.admin.username);


    const [firstname, setFirstname] = useState(props.admin.firstname);

    const [lastname, setLastname] = useState(props.admin.lastname);
    


    function handleSave(){

        let admin ={
            username:username,
            firstname:firstname,
            lastname:lastname
        }

        props.SaveEditCallback(admin);
    }

    return(
        <div className="edit-container">
            <button onClick={()=>{props.handleEditCancel()}}>Cancel</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={props.handleDelete}>Delete</button>

<div className="data-object-edit">

<div className="data-prop">
        <div className="data-prop-key">Firstname</div>
        <div className="data-prop-value"><input onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}/></div>
    </div>


    <div className="data-prop">
        <div className="data-prop-key">Lastname</div>
        <div className="data-prop-value"><input onChange={(e)=>{setLastname(e.target.value)}} value={lastname}/></div>
    </div>
    <div className="data-prop">
        <div className="data-prop-key">Username</div>
        <div className="data-prop-value"><input onChange={(e)=>{setUsername(e.target.value)}} value={username}/></div>
    </div>





</div>      
            

        </div>
    )
}








export default AdminCrud



