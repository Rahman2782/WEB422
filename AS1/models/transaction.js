const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: String, 
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);