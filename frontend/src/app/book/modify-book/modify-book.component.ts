import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookReceiveDto, BookSendDto, GenreCheckBox, Genres } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent implements OnInit {

  modifyBookForm: FormGroup = this.formBuilder.group({
    title: [null, Validators.required],
    dateOfPublish: [null, Validators.required],
    price: [0, Validators.required],
    copiesCreated: [0, Validators.required],
    copiesSold: [0, Validators.required],
    description: [null, Validators.required]
  });

  genreCheckBoxes: GenreCheckBox[] = [];

  book: BookReceiveDto = {
    _id: '',
    title: '',
    dateOfPublish: new Date(),
    price: 0,
    copiesCreated: 0,
    copiesSold: 0,
    description: '',
    reviews: 0,
    genres: ['']
  };

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    for (const genre of Object.values(Genres)) {
      this.genreCheckBoxes.push({ genre: genre, chosen: false });
    }
    const _id = this.route.snapshot.params['_id'];
    this.bookService.getBookById(_id).then(
      book => {
        this.book = book;
        this.modifyBookForm.setValue({
          title: this.book.title,
          dateOfPublish: this.book.dateOfPublish,
          price: this.book.price,
          copiesCreated: this.book.copiesCreated,
          copiesSold: this.book.copiesSold,
          description: this.book.description
        });
        for (const genre of this.book.genres) {
          this.findAndMarkGenreCheckbox(genre);
        }
      },
      reason => {
        console.log(reason);
      });
  }

  private findAndMarkGenreCheckbox(genre: string) {
    for (const genreCheckbox of this.genreCheckBoxes) {
      if (genreCheckbox.genre.toUpperCase() === genre.toUpperCase()) {
        genreCheckbox.chosen = true;
        return;
      }
    }
    throw Error("Genre was not recognised: " + genre);
  }

  modifyBook() {
    const modifiedBook: BookSendDto = this.modifyBookForm.value;
    modifiedBook._id = this.book._id;
    modifiedBook.genres = this.getChosenGenres();
    this.bookService.modifyBook(modifiedBook).then(value => {
      this.router.navigate([`book`], { queryParams: { modifiedTitle: value.title } });
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
