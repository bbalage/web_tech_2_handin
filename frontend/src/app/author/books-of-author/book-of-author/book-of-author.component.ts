import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookReceiveDto } from 'src/app/model/Book';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-book-of-author',
  templateUrl: './book-of-author.component.html',
  styleUrls: ['./book-of-author.component.css']
})
export class BookOfAuthorComponent implements OnInit {

  @Input()
  book!: BookReceiveDto;

  @Output()
  removedBook: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendRemovedBookFromAuthorEvent() {
    this.removedBook.emit(this.book._id);
  }
}
