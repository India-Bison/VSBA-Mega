import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthHrsInputComponent } from './month-hrs-input.component';

describe('MonthHrsInputComponent', () => {
  let component: MonthHrsInputComponent;
  let fixture: ComponentFixture<MonthHrsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthHrsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthHrsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
