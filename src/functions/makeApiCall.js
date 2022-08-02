async function makeApiCall(path, data, method){

    let token = window.localStorage.getItem('token');

    let role = window.localStorage.getItem('role');

    let isPost = false
    if(method === 'POST'){
        isPost = true;
    }
var headers;
    if(path === '/sumbitVendorForm'){
        headers = 

            {
                "Content-Type": "application/json",
                "token": token,
                'role': role
                }
        
    }else{
    headers =      {
            "token": token,
            'role': role
            }
    }

    try {

        let response = await fetch(`http://localhost:5000${path}`,{

            method: method,
            mode:'cors',
            headers:headers,

            body:isPost ? JSON.stringify(data): undefined
        });

        let status = response.status
        

        response = await response.json();

        console.log(response);
        if(status === 200){
            return {good:true,data:response.data, msg:response.msg}
        }else{
            return {good:false, data:{}, msg:response.msg}
        }
        
    } catch (error) {
        console.error(error);
    }
}

export default makeApiCall