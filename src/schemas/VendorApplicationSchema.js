import makeApiCall from "../functions/makeApiCall"

class VendorApplicationSchema{
    constructor(){
        this.businessName = ''
        this.email = ''
        this.vendorType = ''
        this.ein = ''
        this.w9
        this.about
    }

    async submit(){

        let data = new FormData();

        data.append('businessName', this.businessName);
        data.append('email', this.email);
        data.append('ein', this.ein);
        data.append('vendorType',this.vendorType);
        data.append('about', this.about);
        data.append('w9', this.w9)


        await makeApiCall('/submitVendorForm', data, 'POST');
    }
}

export default VendorApplicationSchema