import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterNameComponent } from './update-semester-name.component';

describe('UpdateSemesterNameComponent', () => {
  let component: UpdateSemesterNameComponent;
  let fixture: ComponentFixture<UpdateSemesterNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSemesterNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSemesterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
