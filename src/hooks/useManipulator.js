import { useCallback, useState } from "react"

function useManipulator(){

    const [data, setData] = useState([])

    const read = useCallback(()=>{


        console.log('read')

    }, [])

    return {data, setData, read}

}

export default useManipulator