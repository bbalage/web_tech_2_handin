import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['name', 'email', 'phoneNumber'];

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.authors = await this.getAuthors();
    const queries: string[] = ['savedName', 'updatedName'];
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
      console.log(params);
    })
  }

  async getAuthors() {
    return await this.authorService.getAuthors();
  }

  navigateToAddNewAuthor() {
    this.router.navigateByUrl('author/add');
  }

}
