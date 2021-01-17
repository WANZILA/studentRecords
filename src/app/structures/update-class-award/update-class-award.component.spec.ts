import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassAwardComponent } from './update-class-award.component';

describe('UpdateClassAwardComponent', () => {
  let component: UpdateClassAwardComponent;
  let fixture: ComponentFixture<UpdateClassAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClassAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClassAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
