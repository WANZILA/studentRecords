import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleWorkComponent } from './sample-work.component';

describe('SampleWorkComponent', () => {
  let component: SampleWorkComponent;
  let fixture: ComponentFixture<SampleWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
