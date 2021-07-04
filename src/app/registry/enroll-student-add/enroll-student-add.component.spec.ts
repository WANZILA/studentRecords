import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudentAddComponent } from './enroll-student-add.component';

describe('EnrollStudentAddComponent', () => {
  let component: EnrollStudentAddComponent;
  let fixture: ComponentFixture<EnrollStudentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollStudentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollStudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
