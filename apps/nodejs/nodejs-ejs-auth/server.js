const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));


const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.get('/', (req, res) => {
    if (req.session.token) {
        console.log('Token:', req.session.token);
        jwt.verify(req.session.token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('err: ', err)
                return res.redirect('/login');
            }
            res.render('index', { user: decoded.username });
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, {
            username: req.body.username,
            password: req.body.password,
        });
        console.log('Login service response:', response.data);
        if (response.data && response.data.message === 'Login successful') {
            req.session.token = response.data.token;
            res.redirect('/');
        } else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        res.render('login', { error: 'Invalid username or password' });
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, {
            username: req.body.username,
            password: req.body.password,
        });
        console.log(response)

        console.log('Register service response:', response.data);

        res.redirect('/login');
    } catch (error) {
        console.error('Register error:', error.response ? error.response.data : error.message);
        res.render('register', { error: 'Username already exists' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
    console.log('AUTH_SERVICE_URL:', AUTH_SERVICE_URL);
});
