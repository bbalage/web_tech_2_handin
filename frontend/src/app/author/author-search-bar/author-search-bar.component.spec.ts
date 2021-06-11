import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorSearchBarComponent } from './author-search-bar.component';

describe('AuthorSearchBarComponent', () => {
  let component: AuthorSearchBarComponent;
  let fixture: ComponentFixture<AuthorSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
