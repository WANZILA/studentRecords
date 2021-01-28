import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmittedComponent } from './student-admitted.component';

describe('StudentAdmittedComponent', () => {
  let component: StudentAdmittedComponent;
  let fixture: ComponentFixture<StudentAdmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdmittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
