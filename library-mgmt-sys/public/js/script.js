document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const booksList = document.getElementById('books-list');
    const bookIdInput = document.getElementById('book-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const isbnInput = document.getElementById('isbn');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Fetch and display all books
    const fetchBooks = async () => {
        try {
            const response = await fetch('/api/books');
            const books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error('ERROR FETCHING BOOKS:', error);
        }
    };

    const renderBooks = (books) => {
        booksList.innerHTML = '';
        books.forEach(book => {
            const row = $('<tr>'); //create element
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><span class="badge ${book.isBorrowed ? 'bg-danger' : 'bg-success'}">${book.isBorrowed ? 'Borrowed' : 'Available'}</span></td>
                <td>
                    <button class="btn btn-sm btn-info text-white edit-btn" data-id="${book._id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${book._id}">Delete</button>
                    <button class="btn btn-sm ${book.isBorrowed ? 'btn-warning' : 'btn-success'} borrow-return-btn" data-id="${book._id}" data-is-borrowed="${book.isBorrowed}">
                        ${book.isBorrowed ? 'Return' : 'Borrow'}
                    </button>
                </td>
            `;
            booksList.appendChild(row);
        });

        attachEventListeners();
    };

    // Attach event listeners for dynamic buttons
    const attachEventListeners = () => {
        // Edit button listeners
        $('.edit-btn').on('click', function(e) {
            const bookId = $(this).data('id');

            $.get('/api/books/${bookId}')
                .then(book => {
                    $('#book-id').val(book._id);
                    $('#title').val(book.title);
                    $('#author').val(book.author);
                    $('#isbn').val(book.isbn);
                    $('#submit-btn').text('Update Book');
                    $('#cancel-btn').show();                    
                })
                .catch( error => {
                    console.error('ERROR FETCHING BOOK FOR EDITS: ', error);
            })
        })

        // Delete button listeners
       $('.delete-btn').on('click', async (e) => {
            const bookId = $(this).data('id');

            if(confirm('Are you sure you want to delete this book?')) {
                try {
                    const response = await fetch('/api/books/${bookId}', {method: 'DELETE'});
                    if(response.ok) {
                        fetchBooks(); //refreshing the list
                    } else {
                        const errorData = await response.json();
                        alert(errorData.message);
                    }
                }
                catch (error) {
                    console.error('ERROR DELETING BOOK: ', error);
                }
            }
       })
        

        // Borrow/Return button listeners
        $('.borrow-return-btn').on('click', async (e) => {
            const bookId = $(this).data('id');
            const isBorrowed = $(this).data('isBorrowed') === 'true';
            const endpoint = isBorrowed ? '/api/transactions/return' : '/api/transactions/borrowed';

            try {
                const reponse = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookId, userId: 'user123' })
                });

                if (reponse.ok) {
                    fetchBooks(); //refreshs list
                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            }
            catch (error) {
                console.error('ERROR BORROWING/RETURNING BOOK: ', error);
            }
        });
    };

    //handling for submission for add/update
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = bookIdInput.value;
        const bookData = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };

        try {
            if (bookId) { //update
                await fetch(`/api/books/${bookId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            } else { //add
                await fetch('/api/books', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookData)
                });
            }
            bookForm.reset();
            bookIdInput.value = '';
            submitBtn.textContent = 'Add Book';
            cancelBtn.style.display = 'none';
            fetchBooks(); // Refresh the list
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', () => {
        bookForm.reset();
        bookIdInput.value = '';
        submitBtn.textContent = 'Add Book';
        cancelBtn.style.display = 'none';
    });

    // Initial load
    fetchBooks();
});