import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUnitSearchComponent } from './course-unit-search.component';

describe('CourseUnitSearchComponent', () => {
  let component: CourseUnitSearchComponent;
  let fixture: ComponentFixture<CourseUnitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUnitSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
