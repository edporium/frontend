import { Form, Page } from "../../components/Form/Form"
import Header from "../../components/Header/Header"
import VendorApplicationSchema from "../../schemas/VendorApplicationSchema";
import { useState } from 'react';
import Input from "../../components/Input/Input";
import makeApiCall from "../../functions/makeApiCall";
import './VendorApplication.css';
import family from '../../assets/family.jpg'
import axios from "axios";
function vendorApplication(props) {

    const [fileUploadedFlag, setFileUploadedFlag] = useState(false);
    const [vendorApplication, setVendorApplication] = useState(new VendorApplicationSchema());
    const [fileName, setFileName] = useState('')

    function handleSubmit() {

        console.log(vendorApplication);

       

        axios.post('http://localhost:5000/create/vendor', {vendor:vendorApplication}).then((res)=>{
            if(res.status == 200){
                console.log('vendor created')
            }else{
                console.log('vendor create failed')
            }
        })


    }

    function getFile(e) {

        vendorApplication.w9 = e.target.value;

        setFileName(e.target.value);
        setVendorApplication(vendorApplication => ({

            ...vendorApplication,
            ...{ w9: e.target.files[0] }
        }));
        setFileUploadedFlag(true)
    }


    return (
        <div className="vendor-application">
            <Header></Header>
            <img src={family} className="family-bg"/>
            <div className="img-bg"></div>
            <Form title={'Vendor Form'} handleSubmit={handleSubmit}>

            <Page key='1'><input placeholder="First Name" value={vendorApplication.firstname || ''} onChange={(e) => {


setVendorApplication(vendorApplication => ({
    ...vendorApplication,
    ...{ firstname: e.target.value }
})

)
}} /></Page>
<Page key='2'><input placeholder="Last Name" value={vendorApplication.lastname || ''} onChange={(e) => {


setVendorApplication(vendorApplication => ({
    ...vendorApplication,
    ...{ lastname: e.target.value }
})

)
}} /></Page>
                
                <Page key='3'><input placeholder="Business Name" value={vendorApplication.businessName || ''} onChange={(e) => {


                    setVendorApplication(vendorApplication => ({
                        ...vendorApplication,
                        ...{ businessName: e.target.value }
                    })

                    )
                }} /></Page>
                <Page key='4'><input placeholder="Business Email" value={vendorApplication.email || ''} onChange={(e) => {


                    setVendorApplication(vendorApplication => ({
                        ...vendorApplication,
                        ...{ email: e.target.value }
                    })

                    )
                }} /></Page>

                <Page key='5'><input placeholder="Business EIN" value={vendorApplication.ein || ''} onChange={(e) => {


                    setVendorApplication(vendorApplication => ({
                        ...vendorApplication,
                        ...{ ein: e.target.value }
                    })

                    )
                }} /></Page>
                <Page key='6'><select value={vendorApplication.vendorType || ''} onChange={(e) => {


                    setVendorApplication(vendorApplication => ({
                        ...vendorApplication,
                        ...{ vendorType: e.target.value }
                    })

                    )
                }}>
                    <option value=''>- Select Vendor Type -</option>
                    <option value='tutor'>Tutor</option>
                    <option value='school'>School</option>

                </select></Page>

                <Page key='7'>
                    <>Tell us about yourself</><br />
                    <textarea value={vendorApplication.about} onChange={(e) => {
                        setVendorApplication(vendorApplication => ({
                            ...vendorApplication,
                            ...{ about: e.target.value }
                        })

                        )
                    }} />
                </Page>
                <Page key='8'>{
                    !fileUploadedFlag ? (<>
                        Upload W-9                        <input type='file' onChange={getFile} />
                    </>

                    ) : (
                        <>File had been uploaded:{fileName}<button onClick={() => { setFileUploadedFlag(false) }}>remove</button></>
                    )
                }
                </Page>
            </Form>
        </div>
    )
}

export default vendorApplication