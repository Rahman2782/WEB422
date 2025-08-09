const express = require('express');
const router = express.Router();
const Book = require('../models/book');

//GET all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST new book
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//GET single book by ID
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// PUT/Update a book by ID
router.put('/:id', getBook, async (req, res) => {
    if (req.body.title != null) res.book.title = req.body.title;
    if (req.body.author != null) res.book.author = req.body.author;
    if (req.body.isbn != null) res.book.isbn = req.body.isbn;

    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//middleware to get a book by ID
async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.book = book;
    next();
}

module.exports = router;