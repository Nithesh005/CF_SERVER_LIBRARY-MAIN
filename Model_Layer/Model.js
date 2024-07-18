const { Auth, MailServices } = require("../Common_Layer/Insistance");
const { Product } = require("../Common_Layer/Insistance");
const { jm } = require("../Common_Layer/Insistance");
const db_instance =jm;
async function AddBranch(req) {
    const { username, password } = req.body
    console.log("hello dear model!", username);
    try {
        await Product.query('BEGIN');
        const InsertInStaticBranch = await Product.query(`INSERT INTO public.branch_details_static(
	"CreatedBy", "Location", "Created-Time", "Created-Date")
	VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_DATE) RETURNING "Branch-Id";`, ['nithi', 'Kovai']);
        const BranchId = InsertInStaticBranch.rows[0]["Branch-Id"];

        const result = await Product.query(`INSERT INTO public.branch_details_dynamic(
	"Branch-Id", "Branch-Name", "Owner-Name", "UpdatedBy", "Mobile-No", "Owner-Email", "Pan-Number", "Updated-Time", "Updated-Date", "Status")
	VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_DATE, $8);`, [BranchId, 'Ganthipuram', 'Nithi', 'Prem', 9876543210, 'nithi4@gmail.com', 'LMNOP9012Q', 1]);
        await Product.query('COMMIT'); // Commit transaction if successful
        return true;

    } catch (err) {
        await Product.query('ROLLBACK');
        console.error('Error executing query', err.stack);
        // throw new Error('Internal Server Error -Nithi');
        return false;
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function Select_live_project(req) {
    // const { username, password } = req.body
    console.log("hello dear model!");
    try {
        await db_instance.query('BEGIN');
        const Select_live_project = await db_instance.query(`SELECT "Project_id", "Action_by", "Action_time", "Project_name", "Customer_name", "CE_name", "CE_mobile_no", "Location", "Assigned_to", "Outlet_count", "Description", "Reference", "Reference_by"
	FROM public."Project_reg";`);
        const Select_live_project_row = Select_live_project.rows;
        await db_instance.query('COMMIT');
        return Select_live_project_row;
    } catch (err) {
        await db_instance.query('ROLLBACK');
        console.error('Error executing query', err.stack);
        // throw new Error('Internal Server Error -Nithi');
        return false;
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}

const Db_Instance = MailServices;
async function AddMailData(req) {
    // const { username, password } = req.body
    const { full_name, e_mail, message, phone_number } = req.body;
    console.log("hello dear model!", full_name, e_mail, message);
    try {
        await Db_Instance.query('BEGIN');
        const InsertMailMessage = await Db_Instance.query(`INSERT INTO public."AvieraMail"(
	"Full_name", "Phone_no", e_mail, message)
	VALUES ($1, $2, $3, $4);`, [full_name, phone_number, e_mail, message]);
        await Db_Instance.query('COMMIT'); // Commit transaction if successful
        return ({ sts: true, msg: 'Message Added Successfully' });
    } catch (err) {
        await Db_Instance.query('ROLLBACK');
        console.error('Error executing query', err.stack);
        return ({ sts: false, msg: 'Faild to Add Message' });
    }
}


module.exports = { AddBranch, AddMailData, Select_live_project };