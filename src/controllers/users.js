import connection from "../database/database.js";
import bcrypt from "bcrypt";
//import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

async function listUsers (req, res) {
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

async function listSessions (req, res) {
    try {
        const result = await connection.query('SELECT * FROM sessions;');
        
        if(result.rowCount === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).send(result.rows);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}

async function createUser (req, res) {
    const {name, email, password} = req.body;
    const encripted = bcrypt.hashSync(password, 10);
    try {
        const result = await connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, encripted]);
    
        return res.status(200).send("novo usuario cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        return res.status(409).send(error.code + ": " + error.detail);
    }
}


async function userLogIn (req, res) {
    const {email, password} = req.body;
    try {
        const userData = await connection.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email]);

        if (userData.rowCount === 0) {
            return res.status(401).send("email e/ou senha incorretos");
        }
                        
        const user = userData.rows[0];
        if (!(user && bcrypt.compareSync(password, user.password))) {
            return res.status(401).send("email e/ou senha incorretos");
        }

        //const newToken = uuid();
        //console.log(newToken);
        //const now = dayjs().format();
        //console.log(now);
        
        try {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            await connection.query(`
                DELETE FROM sessions WHERE "userID"=4;`);
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const loggedUser = await connection.query(`
                INSERT INTO sessions (uuid, "userID", lastping) VALUES (gen_random_uuid(), $1, current_timestamp(0));
            `, [user.id]);
            const userConnected = loggedUser.rows[0];
            console.log(userConnected);

            const newToken = await connection.query(`
                SELECT * FROM sessions WHERE "userID"=$1;
            `, [user.id]);
            

            return res.status(200).send(newToken.rows[0].uuid);
            
        } catch (error) {
            console.log(error.code + ": " + error.detail);
            if (error.code === "23505") {
                return res.status(409).send("usuario já está logado");
            }
            return res.status(409).send(error.code + ": " + error.detail);
            
        }
              
       
             
    }
    catch (error) {
        console.log(error);
        return res.status(409).send(error.code + ": " + error.detail);
    }
}

export { listUsers, listSessions, createUser, userLogIn };