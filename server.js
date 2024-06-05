const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

// Controllers 
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageApi = require('./controllers/imageApi');

// Database initiation
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.EXT_DB_URL,
        user: 'dominik',
        password: process.env.DB_PASSWORD,
        database: 'smart_brain_ug65'
    }
})

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://smart-brain-client.netlify.app/'
}));
 
// Endpoints
app.get('/', (req, res) => { res.send('Server is working.') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageApi', (req, res) => { imageApi.handleImageApi(req, res) });


app.listen(process.env.PORT || 3000);

