const { error } = require('console');
const express = require('express');
const fs = require('fs');


const app = express();
const PORT = 5000;

app.get('/expenses/:_userName', (req, res)=>{
    
    fs.readFile("./data/expenses.json", 'utf8', (error, data) =>
    {      
        if(error){
            res.send(error);
             return;
        }
        
        let expenses = JSON.parse(data);
        //res.send("success.." + expenses.user1[0].name);
        let userName = req.params._userName;
       
        if(expenses[userName] != undefined)
        {
            res.status = 200;
            res.send( expenses[userName]);
            //res.sendStatus(200);
        }else{
            res.status = 404;
            res.send( "user not found");
        }
    });

    
    

    
});

app.listen(PORT);