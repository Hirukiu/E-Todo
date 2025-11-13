const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/auth');
const todosRoutes = require('./routes/todos');
const userRoutes = require('./routes/user');

const {connectDB} = require('./config/db');

dotenv.config();                        // recuperer les truc dans .env
app.use(express.static(path.join(__dirname, '../frontend')));    // Servir les fichiers statiques du frontend


app.use(express.json());               //pour que le backend puisse utiliser les information envoyée par le front


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Login.html'));
});
/*
app.use(authRoutes);
app.use(todosRoutes);
app.use(userRoutes);
*/

app.use(authMiddleware);

connectDB().then(db => {
    app.locals.db = db;               // rendre la connexion a la db accessible dans toute les routes
    app.listen(process.env.PORT);                 // demarrer le serveur  
});
