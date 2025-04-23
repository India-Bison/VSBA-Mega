import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormPageComponent } from './project-form-page.component';

describe('ProjectFormPageComponent', () => {
  let component: ProjectFormPageComponent;
  let fixture: ComponentFixture<ProjectFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
