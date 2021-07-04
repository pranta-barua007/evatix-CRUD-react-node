const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'evatix'
    }
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/check', (req, res) => { res.status(200).send('its working') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.post('/profile/:id', (req, res) => { profile.handleProfileUpdate(req, res, db) });


const hash = bcrypt.hashSync('e2pb', 10);
console.log(hash);

const compare = bcrypt.compareSync('e2pb', '$2a$10$7ksQCb6GhYn4ygPc//o54uyqAH282uKdgjeO73qRhtTjVFpPTRF1y')
console.log(compare);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
});

