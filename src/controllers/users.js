import connection from "../database/database.js";

async function listUsers (req, res) {
    try {
        const result = await connection.query('SELECT * FROM users;');
        
        if(result.rowCount === 0) {
            return res.sendStatus(204);
        }

        return res.status(200).send(result.rows);
    }
    catch (error) {
        return res.status(501).send(error);
    }
}

async function createUser (req, res) {
    const {name, cpf, birthDate, email, password} = req.body;
    try {
        const result = await connection.query(`
        INSERT INTO users (name, cpf, "birthDate", email, password) VALUES ($1, $2, $3, $4, $5);
        `, [name, cpf, birthDate, email, password]);
        
        return res.status(200).send("novo usuario cadastrado com sucesso");

    }
    catch (error) {
        return res.sendStatus(501);

    }

}








export { listUsers, createUser };