$(function() {
    const bookForm = $('#book-form');
    const booksList = $('#books-list');
    const bookIdInput = $('#book-id');
    const titleInput = $('#title');
    const authorInput = $('#author');
    const isbnInput = $('#isbn');
    const submitBtn = $('#submit-btn');
    const cancelBtn = $('#cancel-btn');

    //displaying all books
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
        booksList.empty(); 
        books.forEach(book => {
            const row = $(`
                <tr>
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
                </tr>
            `);
            booksList.append(row); 
        });

        attachEventListeners();
    };

    //attaching event listeners for dynamic buttons
    const attachEventListeners = () => {
        $('.edit-btn').on('click', function(e) {
            const bookId = $(this).data('id');

            $.get(`/api/books/${bookId}`)
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

        //delete button listeners
       $('.delete-btn').on('click', async function() {
            const bookId = $(this).data('id');

            if (confirm('Are you sure you want to delete this book?')) {
                try {
                    const response = await fetch(`/api/books/${bookId}`, {method: 'DELETE'});
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
        

        //borrow/return button listeners
        $('.borrow-return-btn').on('click', async function() {
            const bookId = $(this).data('id');
            const isBorrowed = $(this).data('isBorrowed');
            const endpoint = isBorrowed ? '/api/transactions/return' : '/api/transactions/borrow';
            
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookId, userId: 'user123' })
                });

                if (response.ok) {
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
    bookForm.on('submit', async (e) => {
        e.preventDefault();
        const bookId = bookIdInput.val();
        const bookData = {
            title: titleInput.val(),
            author: authorInput.val(),
            isbn: isbnInput.val(),
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
            bookForm[0].reset();
            bookIdInput.val('');
            submitBtn.text('Add Book');
            cancelBtn.hide();
            fetchBooks(); //refreshs list
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    });

    //handle cancel button
    cancelBtn.on('click', () => {
        bookForm.reset();
        bookIdInput.value = '';
        submitBtn.textContent = 'Add Book';
        cancelBtn.style.display = 'none';
    });

    //initial load
    fetchBooks();
});