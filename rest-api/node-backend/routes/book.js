const express = require('express');
const app = express();
const bookRoute = express.Router();

let Book = require('../model/Book');

bookRoute.route('/add-books').post((req, res, next) => {
    Book.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

bookRoute.route('/').get((req, res) => {
    Book.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

bookRoute.route('/update-book/:id').patch((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
            console.log(error);
        } else {
            res.json(data)
            console.log('Book updated successfully!!!')
        }
    });
});

bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id,(error, data) => {
        if (error) {
            return next(error)
            console.log(error);
        } else {
            res.status(200).json({ msg: data })
            console.log('Book deleted successfully!!!')
        }
    });
});

module.exports = bookRoute;