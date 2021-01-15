import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationSearchComponent } from './student-application-search.component';

describe('StudentApplicationSearchComponent', () => {
  let component: StudentApplicationSearchComponent;
  let fixture: ComponentFixture<StudentApplicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
