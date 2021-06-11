import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { AuthorComponent } from './author/author.component';
import { ModifyAuthorComponent } from './author/modify-author/modify-author.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'author',
    component: AuthorComponent
  },
  {
    path: 'author',
    component: AuthorComponent
  },
  {
    path: 'author/add',
    component: AddAuthorComponent
  },
  {
    path: 'author/modify/:_id',
    component: ModifyAuthorComponent
  },
  {
    path: 'book',
    component: BookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
