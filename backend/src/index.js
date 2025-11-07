const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
const userRoutes = require('./routes/user/user');

dotenv.config();                        // recuperer les truc dans .env

app.use(cors());                        //c'est pour autoriser les requetes entre le back et le front  
app.use(express.json());                //pour que le backend puisse utiliser les information envoyée par le front

app.use("/api/auth", authRoutes);       //setup les routes
app.use("/api/todos", todosRoutes);
app.use("/api/user", userRoutes);

connectDB()                             //la fonction defini dans db.js 
  .then(connection => {                 //lorsque elle as terminer faire :
    app.locals.db = connection;         //donner acces a toutes les routes du serveur connection(la base de donées)
    app.listen(process.env.PORT);       //faire ecouter le serveur sur le port defini dans env
  });