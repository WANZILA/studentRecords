import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAttendanceComponent } from './import-attendance.component';

describe('ImportAttendanceComponent', () => {
  let component: ImportAttendanceComponent;
  let fixture: ComponentFixture<ImportAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
