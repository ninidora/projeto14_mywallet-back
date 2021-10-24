import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { query } from "express";
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

async function createUser (req, res) {
    const {name, cpf, birthDate, email, password} = req.body;
    const encripted = bcrypt.hashSync(password, 10);
    try {
        const result = await connection.query(`
        INSERT INTO users (name, cpf, "birthDate", email, password) VALUES ($1, $2, $3, $4, $5);
        `, [name, cpf, birthDate, email, encripted]);
    
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

        const newToken = uuid;
        console.log(newToken);
        const now = dayjs();
        console.log(now);
        console.log
        /*
        try {
            const loggedUser = await connection.query(`
                INSERT INTO sessions (uuid, "userID", lastping) VALUES ($1, $2, $3);
            `, [newToken, user.id, ]);
            
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
            
        }
        */
              
       
        return res.status(200).send(user);        
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


export { listUsers, createUser, userLogIn };