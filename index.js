{
    // const { error } = require('console');
    // const express = require('express');
    // const fs = require('fs');


    // const app = express();
    // const PORT = 5000;

    // app.get('/expenses/:_userName', (req, res)=>{

    //     fs.readFile("./data/expenses.json", 'utf8', (error, data) =>
    //     {
    //         if(error){
    //             res.send(error);
    //              return;
    //         }

    //         let expenses = JSON.parse(data);
    //         let userName = req.params._userName;

    //         let response = {};

    //         if(expenses[userName] != undefined)
    //         {
    //             response.success = true;
    //             response.data = expenses[userName];

    //             res.send( 200, response);
    //         }else{
    //             response.success = false;
    //             response.message = "user not found";
    //             res.send(404, response);
    //         }
    //     });

    // });

    // app.listen(PORT);
}
require('dotenv').config();
const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {
    autoIndex: true
});

const database = mongoose.connection

// database.on('error', (error) => {
//     console.log(error)
// })

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/expenses/api', routes)

app.use(function (error, req, res, next) {
    //console.log('Path: ', req.path)
    console.error('Error: ', error)


    if (error.code == 11000) {
        handleDuplicateKeyError(error, res);
    } else {
        res.status(422).send(error);
    }
});

app.get("/", (req, res) => {
    res.status(200).send("Hey, You are in my backend!!!");
  });


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});

const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const message = `An account with that ${field} already exists.`;

    res.status(code).send({ messages: message, fields: field });
}