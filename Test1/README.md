# Test 1 - REST API Development with Node.js

This is a backend Node.js REST API application that implements simplistic n-memory storage and is capable of managing a collection of users , tracking whether they have borrowed a book, along with the borrowing date and time.

**Packages Used:** Express, Luxon, body-parser, Lodash

## API Endpoints:
'/api/users/lend'
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


