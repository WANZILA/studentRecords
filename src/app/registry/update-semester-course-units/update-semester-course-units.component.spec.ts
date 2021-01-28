import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterCourseUnitsComponent } from './update-semester-course-units.component';

describe('UpdateSemesterCourseUnitsComponent', () => {
  let component: UpdateSemesterCourseUnitsComponent;
  let fixture: ComponentFixture<UpdateSemesterCourseUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSemesterCourseUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSemesterCourseUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
