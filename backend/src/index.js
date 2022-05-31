const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRoutes);

app.listen(3000);
console.log('Server on http://localhost:3000')