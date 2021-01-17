import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseUnitComponent } from './update-course-unit.component';

describe('UpdateCourseUnitComponent', () => {
  let component: UpdateCourseUnitComponent;
  let fixture: ComponentFixture<UpdateCourseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
