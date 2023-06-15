const express = require('express');
const Expense = require('../model/expenses');
const Source = require('../model/sources');
const Account = require('../model/account');

const router = express.Router()

const ADD = "add";
const GET_ALL = "getAll";
const GET_ONE = "getOne";
const EDIT_ONE = "editOne";
const DELETE_ONE = "deleteOne";

const EXPENSES = "expenses";
const SOURCE = "source";
const ACCOUNT = "account";


// CURD Demo
{
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
}

// router.get("/", (req, res, next) => {
//     res.status(200).send("Hey, You are in my backend!!!");
// })

// CURD In account collection
{

    //Post Method
    router.post(`/${ACCOUNT}/${ADD}`, async (req, res, next) => {

        const data = new Account(req.body);

        data.save()
            .then(response => res.send(response))
            .catch(error => next(error));
    })

    //Get All
    router.get(`/${ACCOUNT}/${GET_ALL}`, (req, res, next) => {
        Account.find()
            .then(response => res.send(response))
            .catch(error => next(error));
    })

    //Get by ID Method
    router.get(`/${ACCOUNT}/${GET_ONE}/:id`, (req, res, next) => {
        Account.findById(req.params.id)
            .then(response => res.send(response))
            .catch(error => next(error));
    })

}

// CURD In source collection
{

    //Post Method
    router.post(`/${SOURCE}/${ADD}`, async (req, res, next) => {

        const data = new Source(req.body);

        data.save()
            .then(response => res.send(response))
            .catch(error => next(error));
    })

    //Get All
    router.get(`/${SOURCE}/${GET_ALL}`, (req, res, next) => {
        Source.find()
            .populate('account_id')
            .then((response) => {
                console.log(response);
                res.send(response);
            })
            .catch(error => next(error));
    })

}

// CURD In expenses collection
{
    //Post Method
    router.post(`/${EXPENSES}/${ADD}`, async (req, res, next) => {

        const data = new Expense(req.body);

        data.save()
            .then(response => res.send(response))
            .catch(error => next(error));
    })

    //Get All
    router.get(`/${EXPENSES}/${GET_ALL}`, (req, res, next) => {
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
            .catch(error => next(error));
    })

    //Get by ID Method
    router.get(`/${EXPENSES}/${GET_ONE}/:id`, (req, res, next) => {
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
            .catch(error => next(error));
    })

    // Delete by ID Method
    router.delete(`/${EXPENSES}/${DELETE_ONE}/:id`, (req, res, next) => {

        Expense.findByIdAndDelete(req.params.id)
            .then(response => res.send(response))
            .catch(error => next(error));
        //res.send('Delete by ID API')
    })

    // Edit by ID Method
    router.delete(`/${EXPENSES}/${EDIT_ONE}/:id`, (req, res, next) => {

        Expense.findByIdAndUpdate(req.params.id, new Expense(req.body))
            .then(response => res.send(response))
            .catch(error => next(error));
        //res.send('Delete by ID API')
    })
}

module.exports = router;