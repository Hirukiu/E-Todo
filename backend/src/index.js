const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
const userRoutes = require('./routes/user/user');
const { errorHandler, notFound } = require('./middleware/notFound');

const cors = require('cors');
app.use(cors());

const { connectDB } = require('./config/db');

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';");
  next();
});

dotenv.config();                        // recuperer les truc dans .env
app.use(express.static(path.join(__dirname, '../frontend')));    // Servir les fichiers statiques du frontend


app.use(express.json());               //pour que le backend puisse utiliser les information envoyée par le front


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Create.html'));
});

app.use("/", authRoutes);
app.use("/", todosRoutes);
app.use("/", userRoutes);

app.use(cors())

app.use(notFound);
app.use(errorHandler);


connectDB().then(db => {
  console.log("Connected to database");
  app.locals.db = db;               // rendre la connexion a la db accessible dans toute les routes
  app.listen(process.env.PORT);
});
