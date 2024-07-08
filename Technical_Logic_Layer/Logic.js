// File Imports
const ModelLayer = require('../Model_Layer/Model');
const { SendMail } = require('../Service_Layer/Mail_Service');


async function AddBranch(req) {
    const AddBranch = await ModelLayer.AddBranch(req);
    return AddBranch? "Branch Added Successfully" : "Failed to Add Branch";
}
async function MailLogic(req) {
    const addDataInDb = await ModelLayer.AddMailData(req);
    const SendResponseMail = await SendMail(req);
    console.log(addDataInDb.sts);
    console.log(SendResponseMail.sts);
    return SendResponseMail.sts;
    // return AddBranch? "Branch Added Successfully" : "Failed to Add Branch";
}

module.exports = {AddBranch,MailLogic};