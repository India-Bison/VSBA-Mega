import { Component } from '@angular/core';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { TextAreaComponent } from "../../components/text-area/text-area.component";
import { DateInputComponent } from "../../components/date-input/date-input.component";
import { WeekDaysComponent } from '../../components/week-days/week-days.component';

@Component({
  selector: 'app-project-form-page',
  standalone: true,
  imports: [ToggleTabsComponent, RadioComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent,WeekDaysComponent],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.css'
})
export class ProjectFormPageComponent {
  tabList = [
    {
      name: 'Project',
      action: () => this.submit()  // function reference वापरून call
    },
    {
      name: 'Sub-projects',
      action: () => {
        console.log('Sub-projects tab clicked');
      }
    }
  ];
  
  submit() {
    console.log('Project tab clicked');
    // तू हवे ते logic इथे ठेवू शकतो
  }
}