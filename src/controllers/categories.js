import connection from "../database/database.js";

async function listCategories (req, res) {
    try {
        const result = await connection.query('SELECT * FROM categories;');
        res.send(result.rows);
    }
    catch (error) {
        res.status(501).send(error);
    }
}

async function createCategory (req, res) {
    const {name, categoryID} = req.body;
    try {
        const result = await connection.query(`
        INSERT INTO categories (name, "categoryID") VALUES ($1, $2);
        `, [name, categoryID]);
        
        res.status(200).send("categoria inserida com sucesso");

    }
    catch (error) {
        res.sendStatus(501);

    }

 }
export { listCategories, createCategory };