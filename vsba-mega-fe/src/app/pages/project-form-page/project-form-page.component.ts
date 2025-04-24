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
import { HeaderComponent } from '../../components/header/header.component';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-project-form-page',
  standalone: true,
  imports: [ToggleTabsComponent, RadioComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent,WeekDaysComponent,ButtonComponent,FormsModule,ReactiveFormsModule,NgFor,NgIf,ListComponent,CommonModule,HeaderComponent,DateRangePickerComponent],
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
  projectForm: FormGroup;

constructor(private fb: FormBuilder) {
  this.projectForm = this.fb.group({
    projectName: [''],
    fullVenueRequired: [''],
    resourceType: [''],
    shortDescription: [''],
    auditRequired: [''],
    projectStartDate: [''],
    projectEndDate: [''],
    weekdays: [[]],
    slotType: [''],
    slots: this.fb.array([])
  });
  this.addSlot();
}

get slots(): FormArray {
  return this.projectForm.get('slots') as FormArray;
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
removeSlot(index: number): void {
  if (this.slots.length > 1) {
    this.slots.removeAt(index);
  }
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

submitProjectForm(): void {
  console.log('Full Project Form Value:', this.projectForm.value);
}
dummyData = {
  projectName: "mayur",
  fullVenueRequired: "yes",
  resourceType: "name",
  shortDescription: "mayurrrrrrrr",
  auditRequired: "Comprehensive Audit",
  projectStartDate: "2025-04-24",
  projectEndDate: "2025-04-16",
  weekdays: "sunday,monday,tuesday,wednesday",
  slotType: "Full Day",
  slots: [
    {
      startDate: "2025-04-02",
      endDate: "2025-04-08",
      startTime: "12:22",
      hours: "4",
      pills: [
        "02:19 - 03:19",
        "02:22 - 06:22"
      ]
    }
  ]
};
patchProjectForm(data: any) {
  this.projectForm.patchValue({
    projectName: data.projectName,
    fullVenueRequired: data.fullVenueRequired,
    resourceType: data.resourceType,
    shortDescription: data.shortDescription,
    auditRequired: data.auditRequired,
    projectStartDate: data.projectStartDate,
    projectEndDate: data.projectEndDate,
    weekdays: data.weekdays,
    slotType: data.slotType,
  });
  const slotsFormArray = this.projectForm.get('slots') as FormArray;
  slotsFormArray.clear();
  data.slots.forEach((slot: any) => {
    slotsFormArray.push(this.fb.group({
      startDate: slot.startDate,
      endDate: slot.endDate,
      startTime: slot.startTime,
      hours: slot.hours,
      pills: this.fb.control(slot.pills || [])
    }));
  });
}
ngOnInit() {
  // this.patchProjectForm(this.dummyData);
}
}