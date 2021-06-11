import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorReceiveDto, AuthorSendDto } from '../model/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

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
}
