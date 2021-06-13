import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorReceiveDto, AuthorSendDto } from '../model/Author';
import { BookReceiveDto } from '../model/Book';

interface MessageInterface {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  removeAuthor(_id: string) {
    return this.http.delete<MessageInterface>('api/author', { params: { ['_id']: [_id] } }).toPromise();
  }

  removeBookFromAuthor(authorId: string, bookId: string) {
    return this.http.delete<AuthorReceiveDto>(
      `api/author/book/${authorId}`, { params: { ['bookId']: [bookId] } }).toPromise();
  }

  addAuthor(author: AuthorSendDto) {
    return this.http.post<AuthorSendDto>('/api/author', author).toPromise();
  }

  modifyAuthor(author: AuthorSendDto) {
    return this.http.put<AuthorSendDto>('/api/author', author).toPromise();
  }

  getAuthors() {
    return this.http.get<AuthorReceiveDto[]>('/api/author').toPromise();
  }

  getAuthorById(_id: string) {
    return this.http.get<AuthorReceiveDto>('/api/author', { params: { ['_id']: [_id] } }).toPromise();
  }

  getAuthorsByName(name: string) {
    return this.http.get<AuthorReceiveDto[]>('/api/author', { params: { ['name']: [name] } }).toPromise();
  }

  getBooksOfAuthor(_id: string) {
    return this.http.get<BookReceiveDto[]>('/api/author/get-books', { params: { ['_id']: [_id] } }).toPromise();
  }
}
