import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUnEnrolledComponent } from './student-un-enrolled.component';

describe('StudentUnEnrolledComponent', () => {
  let component: StudentUnEnrolledComponent;
  let fixture: ComponentFixture<StudentUnEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentUnEnrolledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentUnEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
