import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksEnterComponent } from './marks-enter.component';

describe('MarksEnterComponent', () => {
  let component: MarksEnterComponent;
  let fixture: ComponentFixture<MarksEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
