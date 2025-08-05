# WEB422 A1 - Library Management System
A full-stack web application for logging the transactions of library books
Made with:
- Node.js and Express for the backend
- JQuery/Javascript
- Styling with Bootstrap

## Frontend Explained
A simple single page app that utilizes Boostrap for a clean, modern UI.
- User Input: A form at the top of the page lets users add new books to the list, or edit them if needed
- Book List: This is a table that displays all books along with their title, author, ISBN, and status (Borrowed or Returned).
- Features: Each book can be edited, deleted, or dynamically borrowed/returned at the click of a button

## Backend Explained
There are 2 custom APIs here: **Books** and **Transactions**. 'Books' manages most activities like retrieving books (single or all), adding, editing, and deleting). 'Transactions' manages borrowing or returning a book.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/books` | Get a list of all books |
| `GET` | `/api/books/:id` | Get a single book using its unique ID. |
| `POST`| `/api/books` | Add a new book |
| `PUT` | `/api/books/:id` | Update a book by its ID. |
| `DELETE`| `/api/books/:id` | Delete a book by its ID. |

### Body of 'Books' API;
```
{ 
    "title": "...", 
    "author": "...", 
    "isbn": "..." 
}
```

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST`| `/api/transactions/borrow` | Borrow a book. |
| `POST`| `/api/transactions/return` | Return a book. |


```
{
  "bookId": "...",
  "userId": "..."
}
```
