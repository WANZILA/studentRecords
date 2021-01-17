import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterNameComponent } from './semester-name.component';

describe('SemesterNameComponent', () => {
  let component: SemesterNameComponent;
  let fixture: ComponentFixture<SemesterNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
