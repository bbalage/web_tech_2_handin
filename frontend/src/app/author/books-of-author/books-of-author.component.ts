import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorReceiveDto } from 'src/app/model/Author';
import { BookReceiveDto } from 'src/app/model/Book';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-books-of-author',
  templateUrl: './books-of-author.component.html',
  styleUrls: ['./books-of-author.component.css']
})
export class BooksOfAuthorComponent implements OnInit {

  books: BookReceiveDto[] = [];
  authorId!: string;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.params['_id'];
    this.getBooksOfAuthorAndStoreInComponent(this.authorId);
  }

  removeBookFromAuthor(bookId: string) {
    this.authorService.removeBookFromAuthor(this.authorId, bookId).then(
      author => {
        this.getBooksOfAuthorAndStoreInComponent(this.authorId);
      },
      reason => {
        console.log(reason);
      }
    );
  }

  private getBooksOfAuthorAndStoreInComponent(authorId: string) {
    this.authorService.getBooksOfAuthor(this.authorId).then(
      books => {
        this.books = books;
      });
  }

}
