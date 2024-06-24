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
        connectionString: process.env.DB_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        ssl: true
    }
})

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
 
// Endpoints
app.get('/', (req, res) => { res.send('Server is working.') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageApi', (req, res) => { imageApi.handleImageApi(req, res) });


app.listen(process.env.PORT || 3000);

