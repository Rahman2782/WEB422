import dbConnect from '../../../lib/dbConnect';
import Book from '../../../models/Book';
import { NextResponse } from 'next/server'; // Import NextResponse for proper responses

export async function GET(request) {
  await dbConnect();
  try {
    const books = await Book.find({});
    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json(); // Get JSON body from the Request object
    const book = await Book.create(body);
    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}