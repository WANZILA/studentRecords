import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUnitComponent } from './course-unit.component';

describe('CourseUnitComponent', () => {
  let component: CourseUnitComponent;
  let fixture: ComponentFixture<CourseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
