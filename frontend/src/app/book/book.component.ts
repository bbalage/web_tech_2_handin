import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BookReceiveDto } from '../model/Book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: BookReceiveDto[] = [];
  displayedColumns: string[] = ['title', 'dateOfPublish', 'price', 'copiesCreated', 'copiesSold', 'authors', 'actions'];
  searchBarOpenned: boolean = false;
  authorId: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  async ngOnInit(): Promise<void> {
    this.books = await this.bookService.getBooks();
    const queries: string[] = ['savedTitle', 'modifiedTitle', 'authorId'];
    this.route.queryParams.pipe(
      filter(params => {
        for (const query of queries) {
          if (params[query]) {
            return true;
          }
        }
        return false;
      })
    ).subscribe(params => {
      if (params.savedTitle) {
        this.snackBarMessage(`Successfully saved book: ${params.savedTitle}`);
      }
      if (params.modifiedTitle) {
        this.snackBarMessage(`Successfully modified book: ${params.modifiedTitle}`);
      }
      if (params.authorId) {
        this.authorId = params.authorId;
      }
    })
  }

  navigateToAddNewBook() {
    this.router.navigateByUrl('book/add');
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, 'Dismiss');
  }

  searchBook(title: string) {
    console.log("Searched book: " + title);
    this.bookService.getBooksByTitle(title).then((value => {
      this.books = value;
    }),
      reason => {
        console.log(reason);
      });
  }

  showSearchBar() {
    this.searchBarOpenned = true;
  }

  hideSearchBar() {
    this.searchBarOpenned = false;
  }

  finishSearch() {
    this.hideSearchBar();
    this.bookService.getBooks().then(
      values => {
        this.books = values;
      }
    )
  }

  navigateToModifyBook(_id: string) {
    this.router.navigate(['book/modify', _id]);
  }

  addToAuthor(bookId: string) {
    if (!this.authorId) {
      throw Error("Something went wrong.");
    }
    this.bookService.addToAuthor(this.authorId, bookId).then(
      async data => {
        this.snackBarMessage(`Successfully added book to ${data.name}.`);
        this.books = await this.bookService.getBooks();
      },
      reason => {
        console.log(reason);
      }
    );
  }

  removeBook(_id: string) {
    this.bookService.removeBook(_id).then(
      async messageInterface => {
        this.snackBarMessage(messageInterface.message);
        this.books = await this.bookService.getBooks();
      },
      reason => {
        this.snackBarMessage("Could not remove book. Cannot remove referenced book.");
      }
    );
  }
}
