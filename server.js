const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();

// Dotenv + environment variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Body-parser
app.use(express.json());

// Use routers
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/journals', require('./routes/journals'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
