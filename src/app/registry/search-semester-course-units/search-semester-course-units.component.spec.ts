import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSemesterCourseUnitsComponent } from './search-semester-course-units.component';

describe('SearchSemesterCourseUnitsComponent', () => {
  let component: SearchSemesterCourseUnitsComponent;
  let fixture: ComponentFixture<SearchSemesterCourseUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSemesterCourseUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSemesterCourseUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
