import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAwardSearchComponent } from './class-award-search.component';

describe('ClassAwardSearchComponent', () => {
  let component: ClassAwardSearchComponent;
  let fixture: ComponentFixture<ClassAwardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAwardSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAwardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
