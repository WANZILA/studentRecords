import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentMenuComponent } from './admin-student-menu.component';

describe('AdminStudentMenuComponent', () => {
  let component: AdminStudentMenuComponent;
  let fixture: ComponentFixture<AdminStudentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
