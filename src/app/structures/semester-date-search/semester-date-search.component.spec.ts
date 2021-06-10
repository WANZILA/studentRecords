import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterDateSearchComponent } from './semester-date-search.component';

describe('SemesterDateSearchComponent', () => {
  let component: SemesterDateSearchComponent;
  let fixture: ComponentFixture<SemesterDateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterDateSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterDateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
