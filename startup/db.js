const mongoose = require('mongoose');



module.exports = function () {
    const db = process.env.DB;

    mongoose.connect(db)
        .then(() => console.log(`Connected to DB: ${db}`))
        .catch(error => console.log(error.message));
}