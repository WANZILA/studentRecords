import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudentEditComponent } from './enroll-student-edit.component';

describe('EnrollStudentEditComponent', () => {
  let component: EnrollStudentEditComponent;
  let fixture: ComponentFixture<EnrollStudentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollStudentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
