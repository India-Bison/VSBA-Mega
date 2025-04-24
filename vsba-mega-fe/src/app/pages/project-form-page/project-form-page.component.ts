import { Component } from '@angular/core';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { TextAreaComponent } from "../../components/text-area/text-area.component";
import { DateInputComponent } from "../../components/date-input/date-input.component";
import { WeekDaysComponent } from '../../components/week-days/week-days.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-project-form-page',
  standalone: true,
  imports: [ToggleTabsComponent, RadioComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent,WeekDaysComponent,ButtonComponent,FormsModule,ReactiveFormsModule,NgFor,NgIf,ListComponent,CommonModule],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.css'
})
export class ProjectFormPageComponent {
  active_tab = 'Project';
  tabList = [
    {
      name: 'Project',
      action: () => {
        this.active_tab = 'Project',
        this.submit()}
    },
    {
      name: 'Sub-Project',
      action: () => {
        this.active_tab = 'Sub-Project';
        console.log('Sub-projects tab clicked');
      }
    }
  ];
  
  submit() {
    console.log('Project tab clicked');
  }
  slotForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.slotForm = this.fb.group({
      slots: this.fb.array([]),
    });
  }

  get slots(): FormArray {
    return this.slotForm.get('slots') as FormArray;
  }

  addSlot(): void {
    const slotGroup = this.fb.group({
      startDate: [''],
      endDate: [''],
      startTime: [''],
      hours: [''],
      pills: [[]]
    });

    this.slots.push(slotGroup);
  }

  addPill(index: number): void {
    const slotGroup = this.slots.at(index) as FormGroup;
    const startTime = slotGroup.get('startTime')?.value;
    const hoursValue = slotGroup.get('hours')?.value;
  
    if (startTime && hoursValue) {
      const hours = parseInt(hoursValue); 
      const [hoursPart, minutesPart] = startTime.split(':');
      const startDate = new Date();
      startDate.setHours(+hoursPart);
      startDate.setMinutes(+minutesPart);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + hours);
  
      const formatTime = (date: Date): string => {
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
      };
  
      const pillText = `${formatTime(startDate)} - ${formatTime(endDate)}`;
      const currentPills = slotGroup.get('pills')?.value || [];
      currentPills.push(pillText);
      slotGroup.get('pills')?.setValue(currentPills);
    }
  }
  
  removePill(slotIndex: number, pillIndex: number): void {
    const slotGroup = this.slots.at(slotIndex) as FormGroup;
    const currentPills = slotGroup.get('pills')?.value || [];
    currentPills.splice(pillIndex, 1);
    slotGroup.get('pills')?.setValue(currentPills);
  }
}