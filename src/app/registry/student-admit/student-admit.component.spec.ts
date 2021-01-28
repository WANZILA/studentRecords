import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAdmitComponent } from './student-admit.component';

describe('StudentAdmitComponent', () => {
  let component: StudentAdmitComponent;
  let fixture: ComponentFixture<StudentAdmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAdmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAdmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
