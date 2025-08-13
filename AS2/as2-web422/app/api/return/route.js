import dbConnect from '../../../lib/dbConnect';
import Transaction from '../../../models/Transaction';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  await dbConnect();

  try {
    const { bookId, userId } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { bookId, userId, returnDate: null },
      { returnDate: new Date() },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Active borrow transaction not found' });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}