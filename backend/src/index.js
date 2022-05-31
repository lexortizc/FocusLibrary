const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

app.listen(3000);
console.log('Server on http://localhost:3000')