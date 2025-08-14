"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    if (data.success) {
      setBooks(data.data);
    }
  };

const handleBorrow = async (bookId) => {
  if (!userId) {
    alert('Please enter a User ID');
    return;
  }
  
  //handling network errors
  try {
    const res = await fetch('/api/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, userId }),
    });

    if (res.ok) { //status 200?
      alert('Book borrowed successfully!');
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    alert('Failed to connect to the server.');
  }
};

  const handleReturn = async (bookId) => {
    if (!userId) {
      alert('Please enter a User ID');
      return;
    }
    await fetch('/api/return', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, userId }),
    });
    alert('Book returned successfully!');
  };

  return (
    <Container className="my-5">
      <Head>
        <title>Library Management</title>
      </Head>
      <Row className="mb-4">
        <Col>
          <h1>Library Books</h1>
          <Link href="/admin">
            <Button variant="primary">Go to Admin Page</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        {books.map((book) => (
          <Col md={4} key={book._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>ISBN: {book.isbn}</Card.Text>
                <Button variant="success" className="me-2" onClick={() => handleBorrow(book._id)}>
                  Borrow
                </Button>
                <Button variant="info" onClick={() => handleReturn(book._id)}>
                  Return
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}