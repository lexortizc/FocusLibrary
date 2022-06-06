const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const requestRoutes = require('./routes/requests');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);
app.use(requestRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(400).json({
        message: err.message
    })
});

app.listen(4000);
console.log('Server on http://localhost:4000')