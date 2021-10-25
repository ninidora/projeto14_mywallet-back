import connection from "../database/database.js";


async function newEntry(req, res) {

    try {
            const newUserEntry = await connection.query(`
            INSERT INTO transactions ("userID", amount, description, date) VALUES ($1, $2, $3, current_date);
        `, [4, 123.47, "valor teste +"]);

        if (result.rowCount === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).send(result.rows);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

async function userEntries(req, res) {
    const userToken = req.headers.authorization.replace("Bearer ", "");

    try {
        const who = await connection.query(`
            SELECT * FROM sessions WHERE uuid=$1;
        `, [userToken]);
        const userID = who.rows[0].userID;

        const userEntries = await connection.query(`
            SELECT * FROM transactions WHERE "userID"=$1;
        `, [userID]);

        res.send(userEntries.rows);

    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error.code + ": " + error.detail);
    }

}


export { newEntry, userEntries };

/*
{
    "name": "Ramiro Joseph",
    "email": "ramiro@mail.com",
    "password": "$2b$10$xlMMGgL9oIi5sGlMAGOPluQQ2OFdhAqMUMUJGilVD6l//MDgmQywy"
}
*/