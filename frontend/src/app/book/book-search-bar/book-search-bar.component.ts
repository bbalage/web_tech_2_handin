import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-search-bar',
  templateUrl: './book-search-bar.component.html',
  styleUrls: ['./book-search-bar.component.css']
})
export class BookSearchBarComponent implements OnInit {

  @Output()
  searchedBook: EventEmitter<string> = new EventEmitter();

  @Output()
  closedSearchBar: EventEmitter<void> = new EventEmitter();

  searchForm: FormGroup = this.formBuilder.group({
    title: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  sendSearchBookEvent() {
    const title = this.searchForm.value.title;
    this.searchedBook.emit(title);
  }

  sendCloseSearchBarEvent() {
    this.closedSearchBar.emit();
  }

}
