import axios from 'axios';
import { useEffect, useState } from 'react';
import './ApplicationApproval.css';

// Vendor Application Approval for Admin Account

function ApplicationApproval(props) {

    const [vendors, setVendors] = useState([])

    useEffect(() => {

        loadData();

    }, []);

    function loadData(){
        axios.get('http://localhost:5000/read/pendingVendors').then((res) => {
            if (res.status == 200) {
                console.log('fetched vendors', res.data);
                setVendors(res.data);
            }
            else {
                console.log('failed to fetch vendors');

            }
        })
    }


    function handleDecision(e){

        var decision

        if(e.target.id == 'vendor-reject'){
            decision = false;
        }else{
            decision = true;
        }
        console.log(e.target.parentElement)

        let vendor = {vendor:{
            decision:decision,
            vendorId:e.target.parentElement.getAttribute('vendorid')
        }}

        axios.post('http://localhost:5000/update/vendorStatus', vendor).then((res)=>{
            if(res.status == 200){
                console.log('vendor updated');
                loadData();
            }else{
                console.log('error updating vendor');
            }
        })

    }


    return (<div className='application-approval'>

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
                                    <button className='vendor-control-button' id='vendor-approve' onClick={handleDecision}>Approve</button>
                                    <button className='vendor-control-button' id='vendor-reject' onClick={handleDecision}>Reject</button>
                                </div>
                        </div>
                    )
                })
            }
        </div>

    </div>)
}

export default ApplicationApproval