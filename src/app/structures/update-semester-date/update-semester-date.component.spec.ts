import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterDateComponent } from './update-semester-date.component';

describe('UpdateSemesterDateComponent', () => {
  let component: UpdateSemesterDateComponent;
  let fixture: ComponentFixture<UpdateSemesterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSemesterDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSemesterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
