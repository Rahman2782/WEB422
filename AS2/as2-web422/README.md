# WEB422 A2 - Library Management System with Next.js

This is a full-stack web application that implements a simple Library Management System. The system is built using Next.js for both the frontend and the backend API routes. It allows users to manage a collection of books and track borrow and return transactions.

## **Packages Used:** next, react, react-dom, mongoose, react-bootstrap, bootstrap
- mongoose: a library for mongoDB and node.js thats used to define schemas and interact with the mongodb database to manage and transaction data

- react-bootstrap: provides pre-made UI components (like Container, Button, Card, Form) for react apps. Fuull integration of bootstrap allowing for a responsive and consistent UI that was easy to setup and modify. 

- boostrap: the core framework for 'react-bootstrap'

## Project Setup Instructions

Clone the repository using *git clone <repository-url>*

Navigate to the project directory using *cd <project-name>*

Install dependencies using *npm i* in the root directory

Configure your MongoDB connection by making a *.env* file in the root directory and aadding your mongodb connection string to it like this: *MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/my-database*...

Run the development server with *npm run dev* in the root directory

## API Endpoints:
The backend is built using Next.js App Router API routes, which are defined in the app/api directory. All endpoints communicate with a mongoDB database to perform CRUD and transaction operations.

### Book Management (/api/books)
This is a collection of routes for managing the books in the library.

**GET /api/books** - retrieves a list of all books from the database

**POST /api/books** - adds a new book to the database

Sample Request Body in JSON:
```
{
  "title": "The Next.js Handbook",
  "author": "John Doe",
  "isbn": "978-3-16-148410-0"
}
```
**GET /api/books/[bookId]** - retrieves a single book by its unique ID

**PUT /api/books/[bookId]** - updates an existing book's details by its ID

**DELETE /api/books/[bookId]** - deletes a book from the database by its ID.

### Transaction Management
**POST /api/borrow** - borrows a book, the route first validates that the book is not already borrowed by the user before creating a new Transaction record with a borrowDate

Sample Request Body in JSON:
```
{
  "bookId": "651a2f64b38d3b3c3e8a4a5b",
  "userId": "12345"
}
```
**POST /api/return** - returns a book. It searches for an active transaction (a record with no returnDate) for the given bookId and userId, then updates it with the current date.

## Frontend Design
The frontend of the application is designed with a clean and simple interface using react-bootstrap components and global CSS for a consistent look and feel.

- The main page ('/') displays a list of all available books and includes a form for entering a userId and a button to either "Borrow" or "Return" each book.

- Admin Page ('/admin'): this page provides a full-featured admin dashboard that lists all books in the database and a form to add a new book if needed.

Each book in the list has buttons to "Edit" or "Delete" it from the database. The "Edit" button populates the form with the book's details, allowing the user to update the record with ease.


### Bugs that will be fixed:
- return books isnt working as intended as of this commit, return is always valid. 
- searching by userID isnt as responsive as intended. 
- When a book is borrowed or returned, I will add a way to make it more visual the user outside of an alert.