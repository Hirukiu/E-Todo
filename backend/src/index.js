const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
/*
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
const userRoutes = require('./routes/user/user');
*/
const {connectDB} = require('./config/db');

dotenv.config();                        // recuperer les truc dans .env
app.use(express.static(path.join(__dirname, '../../frontend')));    // Servir les fichiers statiques du frontend


app.use(cors());                        //c'est pour autoriser les requetes entre le back et le front  
app.use(express.json());                //pour que le backend puisse utiliser les information envoyée par le front


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Login/Login.html'));
});
/*
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);
app.use("/api/user", userRoutes);
*/

connectDB().then(db => {
    app.locals.db = db;               // rendre la connexion a la db accessible dans toute les routes
    app.listen(process.env.PORT);                 // demarrer le serveur  
});
