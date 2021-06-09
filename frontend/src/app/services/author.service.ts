import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorReceiveDto, AuthorSendDto } from '../model/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  addAuthor(author: AuthorSendDto) {
    this.http.post<AuthorSendDto>('/api/author', author).subscribe(
      (res) => console.log("Author successfully saved: " + res)
    );
  }

  getAuthors() {
    return this.http.get<AuthorReceiveDto[]>('/api/author').toPromise();
  }
}
