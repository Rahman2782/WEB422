// File: app/api/books/[bookId]/route.js

import dbConnect from '../../../../lib/dbConnect';
import Book from '../../../../models/Book';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { bookId } = params;
  await dbConnect();

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const { bookId } = params;
  await dbConnect();

  try {
    const body = await req.json();
    const book = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) { 
  const bookId = params.bookId;
  await dbConnect();

  try {
    const deletedBook = await Book.deleteOne({ _id: bookId });
    if (!deletedBook.deletedCount) {
      return NextResponse.json({ success: false, message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}