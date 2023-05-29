const express = require('express');
const Expense = require('../model/expenses');
const Source = require('../model/sources');
const Account = require('../model/account');

const router = express.Router()

// //Post Method
// router.post('/post', (req, res, next) => {
//     res.send('Post API...' +   JSON.stringify(req.body));

//     const data = new Expense()

//     // Expense.create(req.body).then(function(data){
//     //     res.send(data);
//     // }).catch(next);
// })

// //Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API');

//     // Expense.find({}).then(function(data){
//     //     res.send(data);
//     // }).catch(next);
// })

// //Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })


// CURD In account collection

//Post Method
router.post('/account/add', async (req, res, next) => {

    const data = new Account(req.body);

    data.save()
        .then(response => res.send(response))
        .catch(error => next (error));
})

//Get All
router.get('/account/getAll', (req, res, next) => {
    Account.find()
        .then(response => res.send(response))
        .catch(error => next (error));
})

//Get by ID Method
router.get('/account/getOne/:id', (req, res, next) => {
    Account.findById(req.params.id)
        .then(response => res.send(response))
        .catch(error => next (error));
})

// CURD In source collection

//Post Method
router.post('/source/add', async (req, res, next) => {

    const data = new Source(req.body);

    data.save()
        .then(response => res.send(response))
        .catch(error => next (error));
})

//Get All
router.get('/source/getAll', (req, res, next) => {
    Source.find()
    .populate('account_id')
    .then((response) => {
        console.log(response);
        res.send(response);
    })
    .catch(error => next (error));
})

// CURD In expenses collection

//Post Method
router.post('/expenses/add', async (req, res, next) => {

    const data = new Expense(req.body);

    data.save()
        .then(response => res.send(response))
        .catch(error => next (error));
})

//Get All
router.get('/expenses/getAll', (req, res, next) => {
    Expense.find()
    .populate({
        path: 'source_id',
        model: Source,
        populate: {
           path: 'account_id',
           model: Account
        }
     })
    .then((response) => {
        console.log(response);
        res.send(response);
    })
    .catch(error => next (error));
})

//Get by ID Method
router.get('/expenses/getOne/:id', (req, res, next) => {
    Expense.findById(req.params.id)
        .populate({
            path: 'source_id',
            model: Source,
            populate: {
               path: 'account_id',
               model: Account
            }
         })
        .then(response => res.send(response))
        .catch(error => next (error));
})

module.exports = router;