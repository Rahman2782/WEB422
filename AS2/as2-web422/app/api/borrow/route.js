import dbConnect from '../../../lib/dbConnect';
import Transaction from '../../../models/Transaction';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await dbConnect();
  try {
    const { bookId, userId } = await request.json();

    //checking if the book is already borrowed by this user
    const existingTransaction = await Transaction.findOne({
      bookId: bookId,
      userId: userId,
      returnDate: null, 
    });

    if (existingTransaction) {
      return NextResponse.json(
        { success: false, message: 'This book is already borrowed by this user.' },
        { status: 400 } 
      );
    }

    //create new transaction if none found
    const newTransaction = await Transaction.create({ bookId, userId });

    return NextResponse.json({ success: true, data: newTransaction }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}