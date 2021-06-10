import { Component, OnInit } from '@angular/core';
import { AuthorReceiveDto } from '../model/Author';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: AuthorReceiveDto[] = [];
  displayedColumns: string[] = ['name', 'email', 'phoneNumber'];

  constructor(
    private authorService: AuthorService
  ) { }

  async ngOnInit(): Promise<void> {
    this.authors = await this.getAuthors();
  }

  async getAuthors() {
    return await this.authorService.getAuthors();
  }

}
