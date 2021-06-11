import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthorReceiveDto } from '../model/Author';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: AuthorReceiveDto[] = [];
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'actions'];
  searchBarOpenned: boolean = false;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.authors = await this.authorService.getAuthors();
    const queries: string[] = ['savedName', 'modifiedName'];
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
      if (params.savedName) {
        this.snackBarMessage(`Successfully saved author: ${params.savedName}`);
      }
      if (params.modifiedName) {
        this.snackBarMessage(`Successfully modified author: ${params.modifiedName}`);
      }
    })
  }

  navigateToAddNewAuthor() {
    this.router.navigateByUrl('author/add');
  }

  private snackBarMessage(message: string) {
    this.snackBar.open(message, 'Dismiss');
  }

  searchAuthor(name: string) {
    console.log("Searched author: " + name);
    this.authorService.getAuthorsByName(name).then((value => {
      this.authors = value;
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
    this.authorService.getAuthors().then(
      values => {
        this.authors = values;
      }
    )
  }

  navigateToModifyAuthor(_id: string) {
    this.router.navigate(['author/modify', _id]);
  }

  navigatoToAddBookToAuthor(_id: string) {
    this.router.navigate([`book`], { queryParams: { authorId: _id } });
  }

  //TODO: TEMPORARY!!! Remove when all row menu items are functional!!!
  actions(action: string) {
    console.log("Action is: " + action);
  }
}
