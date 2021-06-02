import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeSearchComponent } from './intake-search.component';

describe('IntakeSearchComponent', () => {
  let component: IntakeSearchComponent;
  let fixture: ComponentFixture<IntakeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
