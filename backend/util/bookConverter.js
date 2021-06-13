const AuthorModel = require('../model/author');

async function convertBooksToSendBookDtos(books) {
    bookSendDtos = [];
    for (const book of books) {
        const bookSendDto = await convertBookToSendBookDto(book);
        bookSendDtos.push(bookSendDto);
    }
    return bookSendDtos;
}

async function convertBookToSendBookDto(book) {
    const bookSendDto = book;
    const authors = await getAuthorsOfBook(book._id);
    bookSendDto.authors = concatAuthorNames(authors);
    return bookSendDto;
}

async function getAuthorsOfBook(_id) {
    const authors = await AuthorModel.find();
    const authorsOfBook = [];
    for (const author of authors) {
        if (author.books.includes(_id)) {
            authorsOfBook.push(author);
        }
    }
    return authorsOfBook;
}

function concatAuthorNames(authors) {
    let authorsString = '';
    for (const author of authors) {
        authorsString += author.name + ', '
    }
    if (authorsString.length > 0) {
        return authorsString.substring(0, authorsString.length - 2);
    }
    return authorsString;
}

bookConverter = {
    convertBooksToSendBookDtos: convertBooksToSendBookDtos,
    convertBookToSendBookDto: convertBookToSendBookDto,
    getAuthorsOfBook: getAuthorsOfBook
}

module.exports = bookConverter;