import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledStudentSearchComponent } from './enrolled-student-search.component';

describe('EnrolledStudentSearchComponent', () => {
  let component: EnrolledStudentSearchComponent;
  let fixture: ComponentFixture<EnrolledStudentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledStudentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledStudentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
