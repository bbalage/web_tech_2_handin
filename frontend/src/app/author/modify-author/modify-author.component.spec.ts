import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAuthorComponent } from './modify-author.component';

describe('ModifyAuthorComponent', () => {
  let component: ModifyAuthorComponent;
  let fixture: ComponentFixture<ModifyAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
