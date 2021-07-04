import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAddComponent } from './mark-add.component';

describe('MarkAddComponent', () => {
  let component: MarkAddComponent;
  let fixture: ComponentFixture<MarkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
