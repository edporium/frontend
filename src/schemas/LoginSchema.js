import makeApiCall from "../functions/makeApiCall.js";

class LoginData{

    constructor(){
        this.username = '';
        this.password = '';
    }


    async submit(){

        let data = {
            username:this.username,
            password:this.password
        }

        let result = await makeApiCall('/login', data, 'POST');

        return result

    }

}

export default new LoginData()