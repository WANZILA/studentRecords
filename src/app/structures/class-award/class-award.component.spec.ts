import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAwardComponent } from './class-award.component';

describe('ClassAwardComponent', () => {
  let component: ClassAwardComponent;
  let fixture: ComponentFixture<ClassAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
