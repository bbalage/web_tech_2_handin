import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-author-search-bar',
  templateUrl: './author-search-bar.component.html',
  styleUrls: ['./author-search-bar.component.css']
})
export class AuthorSearchBarComponent implements OnInit {

  @Output()
  searchedAuthor: EventEmitter<string> = new EventEmitter();

  @Output()
  closedSearchBar: EventEmitter<void> = new EventEmitter();

  searchForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  sendSearchAuthorEvent() {
    const name = this.searchForm.value.name;
    this.searchedAuthor.emit(name);
  }

  sendCloseSearchBarEvent() {
    this.closedSearchBar.emit();
  }
}
