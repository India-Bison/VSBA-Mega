import { Component, ViewChild } from '@angular/core';
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
import { ModalComponent } from '../../components/modal/modal.component';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { MultiSearchComponent } from '../../components/multi-search/multi-search.component';

@Component({
  selector: 'app-project-form-page',
  imports: [ToggleTabsComponent, RadioComponent, MultiSearchComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent, WeekDaysComponent, ButtonComponent, FormsModule, ReactiveFormsModule, NgFor, NgIf, ListComponent, CommonModule, HeaderComponent, DateRangePickerComponent, ModalComponent, ConfirmationPopupComponent],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.css',
  standalone: true,
})
export class ProjectFormPageComponent {
  active_tab = 'Project';
  params: any = {};
  @ViewChild('confirmation_popup') confirmation_popup: any;
  tabList: any[] = [
    {
      name: 'Project',
    },
    {
      name: 'Sub-Project',
    }
  ];
  form: FormGroup;
  sub_form: FormGroup;

  constructor(private fb: FormBuilder, public gs: GlobalService, public ar: ActivatedRoute, public route: Router) {
    this.form = this.fb.group({
      project_name: [''],
      full_venue_required: [''],
      resource_type: [''],
      description: [''],
      audit_required: [''],
      project_start_date: [''],
      project_end_date: [''],
      week_days: [[]],
      slot_type: [''],
      slot_group: this.fb.array([])
    });
    this.sub_form = fb.group({
      project_name: [''],
      full_venue_required: [''],
      resource_type: [''],
      description: [''],
      audit_required: [''],
      project_start_date: [''],
      project_end_date: [''],
      week_days: [[]],
      slot_type: ['']
    })
    this.add_slot();
  }
  ngOnInit() {
    this.ar.queryParams.subscribe(async params => {
      this.params = { ...params };
      if (this.params.id) {
        const projectData = this.gs.items.projects.find((item: any) => item.id === this.params.id);
        if (projectData) {
          this.patch_project_form(projectData);
        }
      }
    })
    this.params.project_id ? this.active_tab = 'Sub-Project' : this.active_tab = 'Project';
    console.log(this.gs.items, "global service data");

  }

  get slots(): FormArray {
    return this.form.get('slot_group') as FormArray;
  }

  add_slot(): void {
    const slotGroup = this.fb.group({
      slot_start_date: [''],
      slot_end_date: [''],
      start_time: [''],
      hours: [''],
      slot_times: [[]]
    });
    this.slots.push(slotGroup);
  }
  remove_slot(index: number): void {
    if (this.slots.length > 1) {
      this.slots.removeAt(index);
    }
  }

  add_pill(index: number): void {
    const slotGroup = this.slots.at(index) as FormGroup;
    const startTime = slotGroup.get('start_time')?.value;
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
      const currentPills = slotGroup.get('slot_times')?.value || [];
      currentPills.push(pillText);
      slotGroup.get('slot_times')?.setValue(currentPills);
    }
  }

  remove_pill(slotIndex: number, pillIndex: number): void {
    const slotGroup = this.slots.at(slotIndex) as FormGroup;
    const currentPills = slotGroup.get('slot_times')?.value || [];
    currentPills.splice(pillIndex, 1);
    slotGroup.get('slot_times')?.setValue(currentPills);
  }
  selected_project_id: any = {}
  submit_form(route?: any): void {
    const nextId = Math.random().toString(36).substring(2, 9);
    const formData = {
      ...this.form.value,
      id: nextId,
      status: 'Pending',
    };
    this.selected_project_id = formData;
    this.gs.items.projects.push(formData);
    this.gs.save_in_local_storage();

    console.log('Full Project Form Value:', formData);
    console.log('Updated Items:', this.gs.items);
    if (route) {
      this.route.navigate(['/project/form'], { queryParams: { id: nextId, view: 'Sub-Project' } });
    } else {
      this.route.navigate(['/project/list'], {});
    }
  }
  add_sub_project() {

    this.route.navigate(['/project/form'], { queryParams: { view: 'Project', parent_id: this.params.id } });
  }

  dummyData = {
    project_name: "mayur",
    full_venue_required: "yes",
    resource_type: "name",
    description: "mayurrrrrrrr",
    audit_required: "Comprehensive Audit",
    project_start_date: "2025-04-24",
    project_end_date: "2025-04-16",
    week_days: "sunday,monday,tuesday,wednesday",
    slot_type: "Full Day",
    slots: [
      {
        slot_start_date: "2025-04-02",
        slot_end_date: "2025-04-08",
        start_time: "12:22",
        hours: "4",
        slot_times: [
          "02:19 - 03:19",
          "02:22 - 06:22"
        ]
      }
    ]
  };
  patch_project_form(data: any) {
    this.form.patchValue(data);
    const slotsFormArray = this.form.get('slot_group') as FormArray;
    slotsFormArray.clear();
    data.slot_group.forEach((slot: any) => {
      slotsFormArray.push(this.fb.group({
        slot_start_date: slot.slot_start_date,
        slot_end_date: slot.slot_end_date,
        start_time: slot.start_time,
        hours: slot.hours,
        slot_times: this.fb.control(slot.slot_times || [])
      }));
    });
  }
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Type', type: 'Value', key: 'slot_type', sort: true, class: 'text-left' },
    { title: 'Name', type: 'Value', key: 'project_name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date-End Date', type: 'startdate_enddate', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
  ];
}