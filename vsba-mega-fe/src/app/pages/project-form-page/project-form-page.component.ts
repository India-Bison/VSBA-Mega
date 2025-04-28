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
import { SubProjectsOfProjectPipe } from '../../sub-projects-of-project.pipe';

@Component({
  selector: 'app-project-form-page',
  imports: [ToggleTabsComponent, RadioComponent, MultiSearchComponent, SubProjectsOfProjectPipe, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent, WeekDaysComponent, ButtonComponent, FormsModule, ReactiveFormsModule, NgFor, NgIf, ListComponent, CommonModule, HeaderComponent, DateRangePickerComponent, ModalComponent, ConfirmationPopupComponent],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.css',
  standalone: true,
})
export class ProjectFormPageComponent {
  active_tab = 'Project';
  params: any = {};
  plus_minus_index: any = 0;
  @ViewChild('confirmation_popup') confirmation_popup: any;
  @ViewChild('submit_Form_page') submit_Form_page: any;
  tabList: any[] = [{name: 'Project',},{name: 'Sub-Project',}];
  form: FormGroup;

  constructor(private fb: FormBuilder, public gs: GlobalService, public ar: ActivatedRoute, public route: Router) {
    this.form = this.fb.group({
      name: [''],
      full_venue_required: [''],
      resource_type: [''],
      description: [''],
      audit_required: [''],
      project_start_date: [''],
      project_end_date: [''],
      week_days: [[]],
      slot_type: [''],
      type: [''],
      slot_group: this.fb.array([])
    });
  }
  ngOnInit() {
    this.ar.queryParams.subscribe(async params => {
      this.params = { ...params };
      if (this.params.id) {
        let projectData: any = {}
        if (this.params.parent_id) {
          projectData = this.gs.items.sub_projects.find((item: any) => item.id === this.params.id);
        } else {
          projectData = this.gs.items.projects.find((item: any) => item.id === this.params.id);
        }
        if (projectData) {
          this.patch_project_form(projectData);
        }
      } else {
        this.add_slot();
      }
    })
    this.params.project_id ? this.active_tab = 'Sub-Project' : this.active_tab = 'Project';
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
    const slot_group = this.slots.at(index) as FormGroup;
    const start_time = slot_group.get('start_time')?.value;
    const hours_value = slot_group.get('hours')?.value;
    if (start_time && hours_value) {
      const hours = parseInt(hours_value, 10);
      const [hours_part, minutes_part] = start_time.split(':').map(Number);
      const now = new Date();
      const start_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours_part, minutes_part);
      const end_date = new Date(start_date);
      end_date.setHours(end_date.getHours() + hours);
      const format_time = (date: Date): string => {
        let hrs = date.getHours();
        const mins = String(date.getMinutes()).padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };
      const pillText = `${format_time(start_date)} - ${format_time(end_date)}`;
      const currentPills: string[] = slot_group.get('slot_times')?.value || [];
      if (currentPills.includes(pillText)) return;
      currentPills.push(pillText);
      slot_group.get('slot_times')?.setValue(currentPills);
      slot_group.get('slot_times')?.markAsDirty();
      slot_group.get('slot_times')?.updateValueAndValidity();
    }
  }
  remove_pill(slot_index: number, pill_index: number): void {
    const slotGroup = this.slots.at(slot_index) as FormGroup;
    const currentPills = slotGroup.get('slot_times')?.value || [];
    currentPills.splice(pill_index, 1);
    slotGroup.get('slot_times')?.setValue(currentPills);
  }
  submit_form(route?: any) {
    // const formData = {
    //   ...this.form.value,
    // };
    // formData.type = this.params.type
    // formData.status = 'Pending'
    // if (!this.params.parent_id && this.params.type == 'Project') {
    //   let response = formData
    //   console.log(response, "project");
    // } else if (this.params.parent_id) {
    //   formData.parent_id = parseInt( this.params.parent_id)      
    //   let response = formData
    //   console.log(response, 'subproject');
    // }
    const formData = {
      ...this.form.value,parent_id: this.params.parent_id || undefined,status: 'Pending',
    };
    console.log(formData,"why");
    
    if (this.params.id) {
      if (this.params.parent_id) {
        let index = this.gs.items.sub_projects.findIndex((item: any) => item.id === this.params.id);
        if (index !== -1) {
          this.gs.items.sub_projects[index] = formData;
        }
      } else {
        let index = this.gs.items.projects.findIndex((item: any) => item.id === this.params.id);
        if (index !== -1) {
          this.gs.items.projects[index] = formData;
        }
      }
    } else {
      const nextId = Math.random().toString(36).substring(2, 9);
      formData.id = nextId;
      if (this.params.parent_id) {
        this.gs.items.sub_projects.push(formData);
      } else {
        this.gs.items.projects.push(formData);
      }
    }
    this.gs.save_in_local_storage();
    this.submit_Form_page.close()
    if (route) {
      this.route.navigate(['/project/form'], { queryParams: { id: this.params.parent_id || formData.id, type: 'Sub-Project' } });
    } else {
      this.route.navigate(['/project/list'], {});
    }
  }
  add_sub_project() {
    this.form.reset()
    this.route.navigate(['/project/form'], { queryParams: { type: 'Project', parent_id: this.params.id } });
  }
  patch_project_form(data: any) {
    this.form.patchValue(data);
    const slots_array = this.form.get('slot_group') as FormArray;
    slots_array.clear();
    data.slot_group.forEach((slot: any) => {
      slots_array.push(this.fb.group({
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
    { title: 'Name', type: 'Value', key: 'name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    // { title: 'Start Date-End Date', type: 'startdate_enddate', key: 'project_start_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
    {
      title: 'Action', type: 'Action', actions: [
        { title: 'Update', icon: 'bx bx-edit-alt', action: this.edit.bind(this) },
        // { title: 'Delete', icon: 'bx bx-trash', action: this.delete.bind(this) },,
      ]
    },
  ];
  async edit(item: any, index: any) {
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, parent_id: this.params.id, type: 'Project' } });
  }

  plus_minus_open_close(index: number) {
    if (this.plus_minus_index == index) {
      this.plus_minus_index = null;
    } else {
      this.plus_minus_index = index;
    }
  }

}