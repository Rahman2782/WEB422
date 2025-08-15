const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: String,
  borrowDate: { type: Date, default: Date.now },
  returnDate: Date,
});

module.exports = mongoose.model('Transaction', transactionSchema);