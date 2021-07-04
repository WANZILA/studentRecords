import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEditComponent } from './mark-edit.component';

describe('MarkEditComponent', () => {
  let component: MarkEditComponent;
  let fixture: ComponentFixture<MarkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
