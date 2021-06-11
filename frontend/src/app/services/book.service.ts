import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookReceiveDto, BookSendDto } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  addBook(author: BookSendDto) {
    return this.http.post<BookSendDto>('/api/book', author).toPromise();
  }

  modifyBook(author: BookSendDto) {
    return this.http.put<BookSendDto>('/api/book', author).toPromise();
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
