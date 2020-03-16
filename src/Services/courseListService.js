const axios = require('axios');
export default class courseListService {


    // Public Method
    getCourseListDataApiAsync() {
        let courseListItems = null;

        return new Promise(async (resolve) => {

            try {
                courseListItems = await axios.get('https://learn.accountingcpd.net/ACPD/API/Test/SampleObject');
                //console.log("axiosFunction", courseListItems);

                return resolve(courseListItems);
            }
            catch (ex) {
                throw ex;
            }

        });
    }

}