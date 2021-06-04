# Web Technologies 2 Hand-in

This is the repository for the Web Technologies 2 university course.

## Usage manual

Here I describe how to start and use the application.

## Project description

The application and its purpose is described here.

The application is a simple administration tool for a book publisher. The structures in the database are:

- **Admin**: To login in order to manage the rest of the structes.
- **Author**: Of one or more published book(s). 
- **Book**: Book published by this publisher.
- **Review**: A review that was written by someone about one of the books.

Json structure for the structures are as follows:

### Admin:
```
{
    name: string,
    email: string (unique),
    password: string
}
```

### Author:
```
{
  name: string,
  email: string,
  phoneNumber: string
  books: [
    ref: objectId
  ]
}
```

### Book:
```
{
  title: string,
  dateOfPublish: date,
  price: number,
  copiesCreated: number,
  copiesSold: number,
  description: string,
  genres: [
    string, string...
  ],
  reviews: [
    {
      reviewer: string,
      review: string
    }
  ]
}
```

The application should be able to perform the following operations on the structures above:

### Author

- [ ] List all authors
- [ ] Find author by name
- [ ] Add new author
- [ ] Modify existing author
- [ ] Delete author
- [ ] Add book for author

### Book

- [ ] List all books, with the name of the author(s) and reviews
- [ ] Find book by title
- [ ] Find book by author
- [ ] Add new book
- [ ] Modify existing book
- [ ] Delete book
- [ ] Add reviews to book
- [ ] Add author for book

### Admin

- [ ] Login as default admin
- [ ] Add new admin
- [ ] Change existing admin
- [ ] Delete admin