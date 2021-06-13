const express = require('express');
const crypto = require('crypto-js');

const router = express.Router();

const auth = require('../util/auth');
const errorHandling = require('../util/error-handling');
const AuthorModel = require('../model/author');
const BookModel = require('../model/book');
const AdminModel = require('../model/admin');

router.all('/', async function (req, res) {
    console.log("RESETING");
    await clearDatabase();
    await addBooks();
    await addAuthors();
    addDefaultAdmin(req, res);
})

function addDefaultAdmin(req, res) {
    const hashedPassword = crypto.SHA256("admin");
    const newAdminObject = {
        name: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword
    };
    const newAdminModel = new AdminModel(newAdminObject);
    newAdminModel.save(function (err, data) {
        if (err) {
            errorHandling.defaultErrorHandling(err, res);
        }
        else {
            res.json(data);
        }
    });
}

async function clearDatabase() {
    await AdminModel.deleteMany({});
    await AuthorModel.deleteMany({});
    await BookModel.deleteMany({});
}

async function addBooks() {
    const book1 = {
        title: "Harry Potter and the Philosopher's Stone",
        dateOfPublish: new Date('1997-06-26'),
        price: 3500,
        copiesCreated: 1000000,
        copiesSold: 874998,
        description: "This a book about a young sorcerer.",
        genres: ["FANTASY", "YOUNG ADULT"]
    };
    const book2 = {
        title: "Harry Potter and the Chamber of Secrets",
        dateOfPublish: new Date('1998-06-26'),
        price: 3504,
        copiesCreated: 1000099,
        copiesSold: 874998,
        description: "This is the second book about the young sorcerer.",
        genres: ["FANTASY", "YOUNG ADULT"]
    }
    const book3 = {
        title: "Dune",
        dateOfPublish: new Date('1955-06-26'),
        price: 4500,
        copiesCreated: 15555555,
        copiesSold: 874998,
        description: "This is an old science fiction book.",
        genres: ["SCIENCE FICTION"]
    }
    const book4 = {
        title: "The Lord of the Rings",
        dateOfPublish: new Date('1935-06-26'),
        price: 3500,
        copiesCreated: 5000000,
        copiesSold: 4874998,
        description: "This is a well known fantasy book series.",
        genres: ["FANTASY"]
    }
    await addBook(book1);
    await addBook(book2);
    await addBook(book3);
    await addBook(book4);
}

async function addBook(book) {
    const bookModel = new BookModel(book);
    await bookModel.save();
}

async function addAuthors() {
    const author1 = {
        name: "J. K. Rowling",
        email: "hogwarts@gmail.com",
        phoneNumber: "+36302221111"
    }
    const author2 = {
        name: "Frank Herbert",
        email: "dune@yahoo.com",
        phoneNumber: "+36302221111"
    }
    const author3 = {
        name: "J. R. R. Tolkien",
        email: "mordor@gmail.com",
        phoneNumber: "+36302221111"
    }
    const author4 = {
        name: "James R. Corey",
        email: "earth@gmail.com",
        phoneNumber: "+36302221111"
    }
    const author5 = {
        name: "John Man",
        email: "mongolia@gmail.com",
        phoneNumber: "+36302221111"
    }
    const author6 = {
        name: "George R. R. Martin",
        email: "gore@gmail.com",
        phoneNumber: "+36302221111"
    }
    await addAuthor(author1);
    await addAuthor(author2);
    await addAuthor(author3);
    await addAuthor(author4);
    await addAuthor(author5);
    await addAuthor(author6);
}

async function addAuthor(author) {
    const authorModel = new AuthorModel(author);
    await authorModel.save();
}

module.exports = router