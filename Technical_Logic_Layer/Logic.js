// File Imports
const ModelLayer = require('../Model_Layer/Model');
const { SendMail } = require('../Service_Layer/Mail_Service');


async function AddBranch(req) {
    const AddBranch = await ModelLayer.AddBranch(req);
    return AddBranch? "Branch Added Successfully" : "Failed to Add Branch";
}
async function Select_live_project(req) {
    const AddBranch = await ModelLayer.Select_live_project(req);
    return AddBranch? AddBranch : "Failed to Read Branch";
}
async function MailLogic(req) {
    // const addDataInDb = await ModelLayer.AddMailData(req);
    // console.log(addDataInDb.sts);
    const SendResponseMail = await SendMail(req);
    console.log(SendResponseMail.sts);
    return SendResponseMail.sts;
    // return AddBranch? "Branch Added Successfully" : "Failed to Add Branch";
}

module.exports = {AddBranch,MailLogic ,Select_live_project};