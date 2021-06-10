import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { AuthorComponent } from './author/author.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
