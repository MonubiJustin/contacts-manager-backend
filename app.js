require('express-async-errors');
const error = require('./middlewere/error');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const morgan = require('morgan')

const express = require('express');
const app = express();


require('./startup/config')()  // define jwt b4 startup
require('./startup/db')(); //establish connection to db

//middleware
app.use(express.json());
app.use(morgan('tiny'))
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes); // Add userRoutes to middleware
app.use(error);

app.get('/', (req, res) => {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));