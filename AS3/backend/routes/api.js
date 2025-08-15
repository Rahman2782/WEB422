const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Transaction = require('../models/transaction');
const { verifyToken } = require('../middleware/auth');

//book CRUD routes
router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.post('/books', verifyToken, async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.send(newBook);
});

router.put('/books/:id', verifyToken, async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updatedBook);
});

router.delete('/books/:id', verifyToken, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send('Book deleted');
});

//transaction routes
router.post('/borrow', verifyToken, async (req, res) => {
  const { bookId, userId } = req.body;
  const newTransaction = new Transaction({ bookId, userId });
  await newTransaction.save();
  res.send(newTransaction);
});

router.post('/return', verifyToken, async (req, res) => {
  const { bookId, userId } = req.body;
  const transaction = await Transaction.findOneAndUpdate(
    { bookId, userId, returnDate: null },
    { returnDate: new Date() },
    { new: true }
  );
  res.send(transaction);
});

module.exports = router;