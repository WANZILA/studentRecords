import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCourseUnitSearchComponent } from './semester-course-unit-search.component';

describe('SemesterCourseUnitSearchComponent', () => {
  let component: SemesterCourseUnitSearchComponent;
  let fixture: ComponentFixture<SemesterCourseUnitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterCourseUnitSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCourseUnitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
