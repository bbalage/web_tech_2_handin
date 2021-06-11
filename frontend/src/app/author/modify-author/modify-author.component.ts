import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorReceiveDto, AuthorSendDto } from 'src/app/model/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-modify-author',
  templateUrl: './modify-author.component.html',
  styleUrls: ['./modify-author.component.css']
})
export class ModifyAuthorComponent implements OnInit {

  modifyAuthorForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    phoneNumber: [null, Validators.required]
  });

  author: AuthorReceiveDto = {
    _id: '',
    name: '',
    email: '',
    phoneNumber: ''
  };

  constructor(
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const _id = this.route.snapshot.params['_id'];
    this.authorService.getAuthorById(_id).then(
      author => {
        this.author = author;
        this.modifyAuthorForm.setValue({
          name: this.author.name,
          email: this.author.email,
          phoneNumber: this.author.phoneNumber
        })
      });

  }

  modifyAuthor() {
    const modifiedAuthor: AuthorSendDto = this.modifyAuthorForm.value;
    modifiedAuthor._id = this.author._id;
    this.authorService.modifyAuthor(modifiedAuthor).then(value => {
      this.router.navigate([`author`], { queryParams: { modifiedName: value.name } });
    });
  }

}
