# Test 1 - REST API Development with Node.js

This is a backend Node.js REST API application that implements simplistic n-memory storage and is capable of managing a collection of users , tracking whether they have borrowed a book, along with the borrowing date and time.

**Packages Used:** Express, Luxon, body-parser, Lodash

- Lodash: This is a javascript library that provieded me with various utilities to easily manipulate arrays and objects. For this project, I used the _.find method as it made searching through a collection easy and fast. I used it to search for the user in the collection with a given username.

- Luxon: This is a javascript library used to work with dates and times. In this project, I used DateTime.now() to get the current date and time, and I also used the .diff() method to get the difference between two DateTime objects (currentDate and borrowedDate) so I can compute the overdue days for a borrowed books.

## API Endpoints:
### '/api/users/lend'
This is a POST method that accepts a username and the current date. By using 'if statements' I validated that the user exists and confirmed that the user does not currently have anything borrowed. If validation fails, a 404 error message is sent. If validation is successful then I used Lodash's .assign method to assign properties to the targeted user. 
 ```
_.assign(user, { borrowedAnything: true , borrowedDate: now.toISO() }); //updating the users record
 ```
 In the code above, _.assign has 2 parameters, the destination object (user) and the source objects (borrowedAnything, borrowedDate)- these source properties will be copied onto the destination object. _.assign is an efficient way to update data in the in-memory array. Object.assign() is also available natively in modern JS however for the purpose of this test I chose to use Lodash instead.
 ```
 Object.assign(user, { borrowedAnything: true, borrowedDate: now.toISO() });
```

Sample Request Body (in Postman/JSON):
```
{
    "username": "Rahman
}
```

If successful, something like this will be returned:
```
{
  "message": "Book successfully lent",
  "user": {
    "username": "Rahman",
    "borrowedAnything": true,
    "borrowedDate": "2025-08-10T10:00:00.000Z"
  }
}
```

### '/api/users/return'
This is another POST method that takes in a username and has the current date. Validation was once again done with if statements and is the same thing as the '/lend' endpoint. This time if everything is valid, the 'borrowedAnything' value is set to false and the borrowedDate is set to 'null' to indicate that the book has been returned.


### '/api/users/overdue'
This is a GET request that checks if the user has any books borrowed for over 14 days. To achieve this I used luxon to get the current date and to format the borrowed date, then calculated the difference using the .diff method with luxon. If a book has been borrowed for over 14 days, a 200 status is sent in json format that contains the username, overdue status, borrowed date, and returned date for that book.

