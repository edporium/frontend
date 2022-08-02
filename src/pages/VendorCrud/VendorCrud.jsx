import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import './VendorCrud.css'
function VendorCrud(props){

    const [vendors, setVendors] = useState([])


    useEffect(()=>{

        loadData();
    }, []);

    function loadData(){
        axios.get('http://localhost:5000/read/approvedVendors').then((res)=>{
            if(res.status == 200){
                console.log('approved vendors loaded', res.data);
                setVendors(res.data)
            }else{
                console.log('failed to load approved vendors')
            }
        })
    }

    function handleDecision(e){


        let data = {
            vendor:{

                id:e.target.parentElement.getAttribute('vendorid')
            }
        }

        axios.post('http://localhost:5000/delete/vendor', data).then((res)=>{
            if(res.status = 200){
                console.log('vendor deleted');
                loadData();
            }else{
                console.log('failed to delete vendor')
            }
        })

    }

    return(<div className="vendor-crud">

        <div className='vendor-list'>
            {
                vendors.map((vendor, index) => {

                    return (

                        <div key={index} className='vendor-info-container'>


                        {Object.keys(vendor).map((key, index)=>{

                            return (
                            <div key={index} className='vendor-info'>
                                <div className='vendor-info-title'>{key}</div>
                                <div className='vendor-info-data'>{vendor[key]}</div>
                                
                            </div>
                            )
                        })}
                                <div className='vendor-controls' vendorid={vendor._id}>
                                    <button className='vendor-control-button' id='vendor-delete' onClick={handleDecision}>Delete</button>
                                </div>
                        </div>
                    )
                })
            }
        </div>


    </div>)
}

export default VendorCrud