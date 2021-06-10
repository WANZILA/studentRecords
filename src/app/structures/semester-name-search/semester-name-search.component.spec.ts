import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterNameSearchComponent } from './semester-name-search.component';

describe('SemesterNameSearchComponent', () => {
  let component: SemesterNameSearchComponent;
  let fixture: ComponentFixture<SemesterNameSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterNameSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterNameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
