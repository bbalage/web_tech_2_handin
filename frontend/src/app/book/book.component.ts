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
  displayedColumns: string[] = ['title', 'dateOfPublish', 'price', 'copiesCreated', 'copiesSold', 'reviews', 'actions'];
  searchBarOpenned: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.books = await this.bookService.getBooks();
    const queries: string[] = ['savedTitle', 'modifiedTitle'];
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

  //TODO: TEMPORARY!!! Remove when all row menu items are functional!!!
  actions(action: string) {
    console.log("Action is: " + action);
  }

}
