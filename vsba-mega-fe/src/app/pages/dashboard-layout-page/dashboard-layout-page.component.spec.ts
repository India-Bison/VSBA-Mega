import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutPageComponent } from './dashboard-layout-page.component';

describe('DashboardLayoutPageComponent', () => {
  let component: DashboardLayoutPageComponent;
  let fixture: ComponentFixture<DashboardLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLayoutPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
