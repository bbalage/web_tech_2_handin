# Web Technologies 2 Hand-in

This is the repository for the Web Technologies 2 university course.

## Usage manual

Here I describe how to start and use the application.

**Note on public and private keys**: I included both the public and private keys with the repository for convinience reasons. This way they don't have to generated to test the application offline. Obviously, this is not a secure solution. If this application (which is a school hand-in after all) happens to go online, the keys at least have to be generated again.

## Project description

The application and its purpose is described here.

The application is a simple administration tool for a book publisher. The structures in the database are:

- **Admin**: To login in order to manage the rest of the structures.
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
  ]
}
```

The application should be able to perform the following operations on the structures above:

### Author

- [x] List all authors
- [x] Find author by name
- [x] Add new author
- [x] Modify existing author
- [x] Delete author
- [x] Add book for author
- [x] Remove book from author

### Book

- [x] List all books, with the names of the authors
- [x] Find book by title
- [x] Add new book
- [x] Modify existing book
- [x] Delete book

### Admin

- [x] Login as default admin
- [ ] Change admin attributes
- [ ] Add new admin