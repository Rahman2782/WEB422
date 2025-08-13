//this file will contain the logic for the API endpoints

const _ = require('lodash'); //find and update records
const { DateTime } = require('luxon'); //for date calculations

const users = [
    { username: 'Rahman', borrowedAnything: false, borrowedDate: null },
    { username: 'Ahmed', borrowedAnything: true, borrowedDate: null }
];

//lending book
exports.lendBook = async (req, res) => {
    const { username } = req.body;
    const now = DateTime.now();

    const user = _.find(users, {username});
    if(!user) {
        return res.status(400).json('ERROR FINDING USER');
    }

    if(user.borrowedAnything) {
        return res.status(400).json('ERROR USER ALREADY IS BORROWING A BOOK');
    }

    _.assign(user, { borrowedAnything: true , borrowedDate: now.toISO() }); //updating the users record
    res.status(200).json('Book lent succesfully');
};

//returning book
exports.returnBook = async (req, res) => {
    const { username } = req.body;

    const user = _.find(users, {username});
    if(!user) {
        return res.status(404).json('ERROR USER NOT FOUND');
    }
    if(!user.borrowedAnything) {
        return res.status(400).json('ERROR USER HAS NOT BORROWED ANYTHING');
    }

    _.assign(user, { borrowedAnything: false, borrowedDate: null});
    res.status(200).json('Book returned succesfully');
};

//checking if anything is overdue
exports.checkOverdue = async (req, res) => {
    const { username } = req.query;

    const user = _.find(users, {username});
    if(!user) {
        return res.status(404).json('ERROR USER NOT FOUND');
    }

    if(!user.borrowedAnything) {
        return res.status(200).json(`User: ${user} has no books borrowed`); //not valid json
    }

    const borrowedDate = DateTime.fromISO(user.borrowedDate);
    const now = DateTime.now();

    //calc diff in days
    const diffInDays = now.diff(borrowedDate, 'days').days;

    //checking if diff is over 14 days
    const isOverdue = diffInDays > 14;

    //overdue status 
    res.status(200).json({
        username,
        isOverdue,
        borrowedDate: user.borrowedDate,
        daysBorrowed: Math.floor(diffInDays)
    });

};