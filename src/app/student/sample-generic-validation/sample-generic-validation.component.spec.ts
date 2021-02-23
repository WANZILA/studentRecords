import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleGenericValidationComponent } from './sample-generic-validation.component';

describe('SampleGenericValidationComponent', () => {
  let component: SampleGenericValidationComponent;
  let fixture: ComponentFixture<SampleGenericValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleGenericValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleGenericValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
