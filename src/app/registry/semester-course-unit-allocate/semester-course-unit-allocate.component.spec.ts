import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterCourseUnitAllocateComponent } from './semester-course-unit-allocate.component';

describe('SemesterCourseUnitAllocateComponent', () => {
  let component: SemesterCourseUnitAllocateComponent;
  let fixture: ComponentFixture<SemesterCourseUnitAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterCourseUnitAllocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterCourseUnitAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
