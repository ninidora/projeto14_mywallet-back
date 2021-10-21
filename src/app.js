import express from 'express';
import cors from 'cors';

import { listCategories, createCategory } from './controllers/categories.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', listCategories);
app.post('/categories', createCategory);








app.listen(4000, () => {
    console.log('Server listening, 4000');
});