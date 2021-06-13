function convertAuthorsToSendAuthorDtos(authors) {
    authorSendDtos = [];
    for (const author of authors) {
        const authorSendDto = convertAuthorToSendAuthorDto(author);
        authorSendDtos.push(authorSendDto);
    }
    return authorSendDtos;
}

function convertAuthorToSendAuthorDto(author) {
    const authorSendDto = author;
    authorSendDto.books = author.books.length;
    return authorSendDto;
}

authorConverter = {
    convertAuthorsToSendAuthorDtos: convertAuthorsToSendAuthorDtos,
    convertAuthorToSendAuthorDto: convertAuthorToSendAuthorDto
}

module.exports = authorConverter;