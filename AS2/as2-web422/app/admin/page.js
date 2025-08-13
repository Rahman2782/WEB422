"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import Link from 'next/link';

export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', isbn: '' });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Update book
      await fetch(`/api/books/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setEditingId(null);
    } else {
      // Add new book
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ title: '', author: '', isbn: '' });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({ title: book.title, author: book.author, isbn: book.isbn });
  };

  const handleDelete = async (bookId) => {
    await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
    fetchBooks();
  };

  return (
    <Container className="my-5">
      <Head>
        <title>Admin - Library Management</title>
      </Head>
      <Row className="mb-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <Link href="/">
            <Button variant="secondary">Back to Main Page</Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingId ? 'Update Book' : 'Add Book'}
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>All Books</h3>
          {books.map((book) => (
            <Card key={book._id} className="mb-2">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>ISBN: {book.isbn}</Card.Text>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(book)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(book._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}