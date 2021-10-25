import connection from "../database/database.js";


async function newEntry(req, res) {
    const userToken = req.headers.authorization.replace("Bearer ", "");
    try {
        const who = await connection.query(`
            SELECT * FROM sessions WHERE uuid=$1;
        `, [userToken]);
        if (who.rowCount === 0) {
            return res.sendStatus(404);
        }
        const userID = who.rows[0].userID;

        const newUserEntry = await connection.query(`
            INSERT INTO transactions ("userID", amount, description, date) VALUES ($1, $2, $3, current_date);
        `, [userID, req.body.amount, req.body.description]);
        console.log(newUserEntry);

        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error.code + ": " + error.detail);
    }
}

async function userEntries(req, res) {
    const userToken = req.headers.authorization.replace("Bearer ", "");
    try {
        const who = await connection.query(`
            SELECT * FROM sessions WHERE uuid=$1;
        `, [userToken]);
        
        if (who.rowCount === 0) {
            return res.sendStatus(404);
        }
        const userID = who.rows[0].userID;

        const userEntries = await connection.query(`
            SELECT * FROM transactions WHERE "userID"=$1;
        `, [userID]);
        if (userEntries.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(userEntries.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error.code + ": " + error.detail);
    }

}


export { newEntry, userEntries };