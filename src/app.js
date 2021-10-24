import express from 'express';
import cors from 'cors';

import { listUsers, listSessions, createUser, userLogIn } from './controllers/users.js';
import { newActivity } from './controllers/transactions.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', listUsers);
app.post('/users', createUser);

app.post('/sign-in', userLogIn);
app.get('/sessions', listSessions);

app.post('/transactions', newActivity);




app.listen(4000, () => {
    console.log('Server listening, 4000');
});