import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorReceiveDto } from '../model/Author';
import { BookReceiveDto, BookSendDto } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  addBook(book: BookSendDto) {
    return this.http.post<BookSendDto>('/api/book', book).toPromise();
  }

  modifyBook(book: BookSendDto) {
    return this.http.put<BookSendDto>('/api/book', book).toPromise();
  }

  addToAuthor(authorId: string, bookId: string) {
    return this.http.put<AuthorReceiveDto>('/api/author/add-book', { authorId: authorId, bookId: bookId }).toPromise();
  }

  getBooks() {
    return this.http.get<BookReceiveDto[]>('/api/book').toPromise();
  }

  getBookById(_id: string) {
    return this.http.get<BookReceiveDto>('/api/book', { params: { ['_id']: [_id] } }).toPromise();
  }

  getBooksByTitle(title: string) {
    return this.http.get<BookReceiveDto[]>('/api/book', { params: { ['title']: [title] } }).toPromise();
  }
}
