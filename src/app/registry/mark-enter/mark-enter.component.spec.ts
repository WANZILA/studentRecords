import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEnterComponent } from './mark-enter.component';

describe('MarkEnterComponent', () => {
  let component: MarkEnterComponent;
  let fixture: ComponentFixture<MarkEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
