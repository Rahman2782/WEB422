import dbConnect from '../../../lib/dbConnect';
import Book from '../../../../models/Book';

export default async function handler(req, res) {
  const {
    query: { bookId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const book = await Book.findByIdAndUpdate(bookId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!book) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedBook = await Book.deleteOne({ _id: bookId });
        if (!deletedBook.deletedCount) {
          return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}