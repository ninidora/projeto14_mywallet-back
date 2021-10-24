import connection from "../database/database.js";
import bcrypt from "bcrypt";


async function newActivity (req, res) {
    try {
        const result = await connection.query('SELECT * FROM users;');
        
        if(result.rowCount === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).send(result.rows);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}



export { newActivity };

/*
{
    "id": 19,
    "name": "Ramiro Joseph",
    "cpf": "01234567890",
    "birthDate": "2018-11-27T03:00:00.000Z",
    "email": "ramiro@mail.com",
    "password": "$2b$10$xlMMGgL9oIi5sGlMAGOPluQQ2OFdhAqMUMUJGilVD6l//MDgmQywy"
}
*/