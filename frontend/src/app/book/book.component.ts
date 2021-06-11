import { Component, OnInit } from '@angular/core';
import { BookReceiveDto } from '../model/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: BookReceiveDto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
