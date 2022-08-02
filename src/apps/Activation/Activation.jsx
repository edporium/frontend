// Account Activation Page

import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";


function Activation(props){

    let activationLink = useParams('activationLink')

    return(<div className="activation">

<Header/>


    </div>)
}

export default Activation