import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericValidation2Component } from './generic-validation2.component';

describe('GenericValidation2Component', () => {
  let component: GenericValidation2Component;
  let fixture: ComponentFixture<GenericValidation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericValidation2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericValidation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
