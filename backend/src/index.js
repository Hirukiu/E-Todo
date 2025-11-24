const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
const userRoutes = require('./routes/user/user');
const { errorHandler, notFound } = require('./middleware/notFound');

const cors = require('cors');
app.use(cors());

dotenv.config();
app.use(express.json());

console.log("coucou - Serveur API démarré");
app.use("/", authRoutes);
app.use("/", todosRoutes);
app.use("/", userRoutes);


app.use(notFound);
app.use(errorHandler);


const { connectDB } = require('./config/db');

connectDB().then(db => {
  console.log("Connected to database");
  app.locals.db = db;
  app.listen(process.env.PORT || 5000, () => {
    console.log(`API Server listening on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error("Failed to connect to database:", err.message);
  process.exit(1);
});