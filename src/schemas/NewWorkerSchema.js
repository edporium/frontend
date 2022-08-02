import makeApiCall from "../functions/makeApiCall"

class NewWorkerSchema{
    constructor(){
        this.firstname = ''
        this.lastname = ''
        this.username = ''
        this.type = ''
    }

    async submit(){

        let result = await makeApiCall('/newWorker', {
            firstname:this.firstname,
            lastname:this.lastname,
            username:this.username,
            type:this.type
        })


        return result
    }
}

export default new NewWorkerSchema();