import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExaminationCardComponent } from './student-examination-card.component';

describe('StudentExaminationCardComponent', () => {
  let component: StudentExaminationCardComponent;
  let fixture: ComponentFixture<StudentExaminationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExaminationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExaminationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
