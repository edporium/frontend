import './FundCrud.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
function FundCrud(props) {

    const [manipulateView, setManipulateView] = useState(false);
    const [data, setData] = useState([]);
    const [selectedFund, setSelectedFund] = useState({})
    const [creating, setCreating] = useState(false);
    useEffect(() => {

        loadData();

    }, [])


    function loadData() {
        axios.get('http://localhost:5000/read/funds', data).then((res) => {
            console.log(res)

            if (res.status == 200) {

                setManipulateView(false)
                setData(res.data);



            }
        }).then(() => {
            setManipulateView(false)
        })
    }

    function handleCreateClick() {
        setManipulateView(true);
        setCreating(true);
    }

    function handleCancelClick() {

        setManipulateView(false);
        setCreating(false);
        setSelectedFund({})
    }

    function updateFund(data) {


        data.fund._id = selectedFund._id;


        axios.post('http://localhost:5000/update/fund', data).then((res) => {
            console.log(res.status)

            if (res.status == 200) {
                setSelectedFund({})
                loadData();



            }
        })

    }

    function createFund(data) {

        axios.post('http://localhost:5000/create/fund', data).then((res) => {
            console.log(res.status)

            if (res.status == 200) {

                loadData();
                setCreating(false);
                setManipulateView(false)

            }
        })

    }



    function deleteFund(id) {

        console.log(id);

        axios.post('http://localhost:5000/delete/fund', { fund: { fundId: id } }).then((res) => {
            if (res.status == 200) {
                console.log('fund deleted');
                setSelectedFund({})

                setManipulateView(false);
                setCreating(false);
                loadData()
            } else {
                console.log('error deleting fund');
            }
        })
    }

    function handleSave(data) {

        if (Object.keys(selectedFund).length == 0) {
            setSelectedFund({})

            setManipulateView(false);
            setCreating(false);
            createFund(data)

        } else {
            setSelectedFund({})

            setManipulateView(false);
            setCreating(false);
            updateFund(data)
        }
    }


    function handleObjectSelect(e) {


        let id = e.target.getAttribute('objectId');

        data.forEach((object) => {

            if (object._id == id) {

                setSelectedFund((prev) => {

                    setManipulateView(true)

                    setCreating(false);

                    return object

                });




            }
        })

    }


    if (manipulateView) {
        return <FundManipulator creating={creating} deleteFund={deleteFund} handleSave={handleSave} fund={selectedFund} handleCancelClick={handleCancelClick} />
    }
    else {

        return (<div className="fund-crud">
            <button onClick={handleCreateClick}>Create</button>
            <div className='read-container'>

                {
                    data.map((fund, index) => {
                        return (
                            <div objectid={fund['_id']} key={fund['_id']} onClick={handleObjectSelect} className="data-object">
                                {
                                    Object.keys(fund).map((key, keyIndex) => {

                                        if (key != '_id' && key != '__v') {

                                            return (
                                                <div key={key + String(fund["_id"])} className="data-prop">
                                                    <div className="data-prop-key">{key}</div>
                                                    <div className="data-prop-value">{fund[key]}</div>
                                                </div>
                                            )

                                        }
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


function FundManipulator(props) {

    const [name, setName] = useState('' || props.fund['name']);


    const [balance, setBalance] = useState('' || props.fund.balance);

    const [distributed, setDistributed] = useState(0 || props.fund.distributed);

    function bundleData() {

        let data = {

            fund: {
                name: name,
                balance: balance,
            
            }
        }

        props.handleSave(data)
    }

    return (<div className='fund-crud'>

        <button onClick={props.handleCancelClick}>Cancel</button>
        <button onClick={bundleData}>Save</button>
        {
            !props.creating ? (
                <button onClick={() => { props.deleteFund(props.fund._id) }}>Delete</button>

            ) : (<></>)
        }
        <div className='manipulate-container'>
            <div className='data-object-edit'>
                <div className='data-prop'>
                    <div className='data-prop-key'>Name</div>
                    <div className='data-prop-value'><input value={name || ''} onChange={(e) => { setName(e.target.value) }} /></div>
                </div>
                <div className='data-prop'>
                    <div className='data-prop-key'>Balance</div>
                    <div className='data-prop-value'><input step='0.01' type='number' value={balance || ''} onChange={(e) => { setBalance(e.target.value) }} /></div>
                </div>

                <div className='data-prop'>
                    <div className='data-prop-key'>Distributed</div>
                    <div className='data-prop-value'><input readOnly step='0.01' type='number' value={distributed || ''} onChange={(e) => { setBalance(e.target.value) }} /></div>
                </div>

            </div>
        </div>
    </div>)
}

export default FundCrud