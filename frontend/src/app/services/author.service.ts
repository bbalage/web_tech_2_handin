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

  getAuthors() {
    return this.http.get<AuthorReceiveDto[]>('/api/author').toPromise();
  }

  getAuthorsByName(name: string) {
    return this.http.get<AuthorReceiveDto[]>('/api/author', { params: { ['name']: [name] } }).toPromise();
  }
}
