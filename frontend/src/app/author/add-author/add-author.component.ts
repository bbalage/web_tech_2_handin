import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorReceiveDto, AuthorSendDto } from 'src/app/model/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  addAuthorForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    phoneNumber: [null, Validators.required]
  });

  constructor(
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addAuthor() {
    const newAuthor: AuthorSendDto = this.addAuthorForm.value;
    this.authorService.addAuthor(newAuthor).then(value => {
      this.router.navigate([`author`], { queryParams: { savedName: value.name } });
    });
  }

}
