import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookSendDto, GenreCheckBox, Genres } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup = this.formBuilder.group({
    title: [null, Validators.required],
    dateOfPublish: [new Date(), Validators.required],
    price: [0, Validators.required],
    copiesCreated: [0, Validators.required],
    copiesSold: [0, Validators.required],
    description: [null, Validators.required]
  });

  genreCheckBoxes: GenreCheckBox[] = [];

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    for (const genre of Object.values(Genres)) {
      this.genreCheckBoxes.push({ genre: genre, chosen: false });
    }
  }

  addBook() {
    const newBook: BookSendDto = this.addBookForm.value;
    newBook.genres = this.getChosenGenres();
    this.bookService.addBook(newBook).then(value => {
      this.router.navigate([`book`], { queryParams: { savedTitle: value.title } });
    });
  }

  getChosenGenres(): string[] {
    const chosenGenres = [];
    for (const genreCheckbox of this.genreCheckBoxes) {
      if (genreCheckbox.chosen) {
        chosenGenres.push(genreCheckbox.genre);
      }
    }
    return chosenGenres;
  }
}
