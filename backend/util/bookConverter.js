function convertBooksToSendBookDtos(books) {
    bookSendDtos = [];
    for (const book of books) {
        const bookSendDto = convertBookToSendBookDto(book);
        bookSendDtos.push(bookSendDto);
    }
    return bookSendDtos;
}

function convertBookToSendBookDto(book) {
    const bookSendDto = book;
    bookSendDto.reviews = book.reviews.length;
    return bookSendDto;
}

bookConverter = {
    convertBooksToSendBookDtos: convertBooksToSendBookDtos,
    convertBookToSendBookDto: convertBookToSendBookDto
}

module.exports = bookConverter;