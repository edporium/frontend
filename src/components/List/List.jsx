import axios from "axios"
import { useEffect } from "react"

function List(props){

    useEffect(()=>{

        axios.get(props.url).then((res)=>{

            if(res.status == 200){
                console.log(res.data);
            }else{
                console.log('failed to fetch list data')
            }
        })

    }, [])

    return(<div className="list">

    </div>)
}

export default List