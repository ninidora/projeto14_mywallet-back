import express from 'express';
import cors from 'cors';

import { listUsers, createUser, userLogIn } from './controllers/users.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', listUsers);
app.post('/create-user', createUser);

app.post('/sign-in', userLogIn);








app.listen(4000, () => {
    console.log('Server listening, 4000');
});