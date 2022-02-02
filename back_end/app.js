//importation de dotenv
require('dotenv').config();
//importation d'express
const express = require('express');
//application d'express à une var pour pouvoir s'en servir
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
//importation de dotenv
require('dotenv').config();

//va chercher la logique des routes dans le fichier nous servant à mutualiser les routes ensemble
/* 
const chanelRoutes = require('./routes/chanel');*/
const statusRoutes = require ('./routes/status');
const commentRoutes = require ('./routes/comment_routes');
const userRoutes = require('./routes/user_routes'); 
const profilesRoutes = require('./routes/profiles_routes'); 



// imporation bdd
require('./db_connect/mysql_connect');

//Permet au server de modifier des choses sur notre site ? CORS
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//utilisation de routeur
app.use('/api/auth', userRoutes);
app.use('/api/profile', profilesRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/comment', statusRoutes);

module.exports = app;