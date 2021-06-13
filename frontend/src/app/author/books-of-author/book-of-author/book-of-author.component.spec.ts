import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfAuthorComponent } from './book-of-author.component';

describe('BookOfAuthorComponent', () => {
  let component: BookOfAuthorComponent;
  let fixture: ComponentFixture<BookOfAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookOfAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOfAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
