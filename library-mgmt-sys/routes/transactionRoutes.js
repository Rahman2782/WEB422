const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Transaction = require('../models/transaction');

//POST to borrow book
router.post('/borrow', async (req, res) => {
    const { bookId, userId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.isBorrowed) {
            return res.status(400).json({ message: 'Book is already borrowed' });
        }

        book.isBorrowed = true;
        await book.save();

        const transaction = new Transaction({ bookId, userId });
        await transaction.save();

        res.status(201).json({ message: 'Book borrowed successfully', transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST to return book
router.post('/return', async (req, res) => {
    const { bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (!book.isBorrowed) {
            return res.status(400).json({ message: 'Book is not currently borrowed' });
        }

        book.isBorrowed = false;
        await book.save();

        //Update the transaction with dummy return date
        await Transaction.findOneAndUpdate(
            { bookId: bookId, returnDate: null },
            { returnDate: Date.now() }
        );

        res.json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;