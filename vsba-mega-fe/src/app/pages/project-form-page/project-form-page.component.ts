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
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { MultiSearchComponent } from '../../components/multi-search/multi-search.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form-page',
  imports: [ToggleTabsComponent, RadioComponent, MultiSearchComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, DateInputComponent, DateInputComponent, WeekDaysComponent, ButtonComponent, FormsModule, ReactiveFormsModule, NgFor, NgIf, ListComponent, CommonModule, HeaderComponent, DateRangePickerComponent, ConfirmationPopupComponent],
  templateUrl: './project-form-page.component.html',
  styleUrl: './project-form-page.component.css',
  standalone: true,
})
export class ProjectFormPageComponent {
  active_tab = 'Project';
  params: any = {};
  project_start_end_date: any = {};
  slot_start_end_date: any = {};
  plus_minus_index: any = 0;
  @ViewChild('confirmation_popup') confirmation_popup: any;
  @ViewChild('submit_Form_page') submit_Form_page: any;
  tabList: any[] = [{ name: 'Project', }, { name: 'Sub-Project', }];
  form: FormGroup;

  constructor(private fb: FormBuilder, public gs: GlobalService, public ar: ActivatedRoute, public route: Router, public ps: ProjectService) {
    this.form = this.fb.group({
      name: [''],
      short_name: [''],
      full_venue_required: [''],
      resource_type: [''],
      description: [''],
      audit_required: [''],
      project_start_date: [''],
      project_end_date: [''],
      week_days: [[]],
      slot_type: ['Time Slot'],
      type: [''],
      slot_groups: this.fb.array([])
    });
    if (!this.params.id) {
      this.add_slot()
    }
  }
  parent_project: any
  ngOnInit() {
    // this.gs.toastr_shows_function('mayur', 'Error', 'error')
    this.ar.queryParams.subscribe(async params => {
      this.params = { ...params };
      if (this.params.id) {
        this.patch_project_form(this.params.id);
      }
      if (this.params.parent_id || this.params.id) {
        this.parent_project = (await this.ps?.get(this.params.parent_id ? this.params.parent_id :this.params.id))?.data;
      }
    })

    this.params.parent_id ? this.active_tab = 'Sub-Project' : this.active_tab = 'Project';
  }
  get slots(): FormArray {
    return this.form.get('slot_groups') as FormArray;
  }
  add_slot(): void {
    const slotGroup = this.fb.group({
      slot_start_date: [''],
      slot_end_date: [''],
      start_time: [''],
      end_time: [''],
      hours: [''],
      slot_times: [[]]
    });
    this.slots.push(slotGroup);
  }
  remove_slot(index: number): void {
    if (this.slots.length > 1 || true) {
      // True added for Akash temporarily
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

  async submit_form(route?: any) {
    const formData = {
      ...this.form.value,
    };
    formData.type = this.params.type
    formData.status = 'Pending'
    if (!this.params.parent_id && this.params.type == 'Project') {
      formData.type = 'Project'
      let response: any = await this.ps.add(formData)
      if (route == 'Sub-Project') {
        console.log(response);
        this.route.navigate([], { queryParams: { type: 'Sub-Project', parent_id: response.data.id }, queryParamsHandling: 'merge', })
      } else {
        this.route.navigate(['/project/list'], {})
      }
    } else if (this.params.parent_id) {
      formData.parent_id = parseInt(this.params.parent_id)
      formData.type = 'Sub-Project'
      let response = await this.ps.add(formData)
      this.route.navigate([], { queryParams: { type: 'Sub-Project', parent_id: formData.parent_id || this.params.parent_id }, queryParamsHandling: 'merge', })
    }
  }
  async update() {
    try {
      let data = { ...this.form.value };
      if (this.params.sub_project_update == 'true') {
        data.type = 'Sub-Project' 
      } else {
        data.type = 'Project'
      }
      let response: any = await this.ps.update(this.params.id, data);
      window.history.back()
    } catch (error: any) {
      // this.gs.toastr_shows_function(error?.error?.message, 'Error', 'error')
    }
  }
  add_sub_project() {
    this.form.reset();
    this.route.navigate([], { queryParams: { type: 'Project', parent_id: this.params.parent_id || this.params.id } });
  }

  back_to_page(){
    this.route.navigate(['/project/list'], {})
  }

  async patch_project_form(data: any) {
    let dataa = await this.ps?.get(data);
    this.form.patchValue(dataa.data);
    const slots_array = this.form.get('slot_groups') as FormArray;
    slots_array.clear();
    this.slot_start_end_date = []
    if (dataa?.data?.slot_groups && Array.isArray(dataa?.data?.slot_groups) && dataa.data.slot_groups.length > 0) {
      dataa?.data?.slot_groups.forEach((slot: any) => {
        slots_array.push(this.fb.group({
          slot_start_date: slot.slot_start_date,
          slot_end_date: slot.slot_end_date,
          start_time: slot.start_time,
          hours: slot.hours,
          slot_times: this.fb.control(slot.slot_times || [])
        }));
        this.slot_start_end_date.push({
          start: slot.slot_start_date,
          end: slot.slot_end_date
        });
      });
    } else {
      console.log('Slot group empty aahe');
      this.add_slot();
    }
    this.project_start_end_date = {
      start: dataa.data.project_start_date,
      end: dataa.data.project_end_date
    }
  }

  discard(){
   window.history.back()
  }






  @ViewChild('delete_sub_project_row') delete_sub_project_row:any
  selected_delete_sub_project: any = {}
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Sub-Project Name', type: 'Value', key: 'name', sort: true, class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left' },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left' },
    { title: 'Start Date', type: 'Value', key: 'project_start_date', class: 'text-left' },
    { title: 'End Date', type: 'Value', key: 'project_end_date', class: 'text-left' },
    { title: 'Status', type: 'Value', key: 'status', class: 'text-left' },
    {
      title: 'Action', type: 'Action', actions: [
        { title: 'View', icon: '../../../assets/view_icon.svg', action: this.view.bind(this) },
        { title: 'Edit', icon: '../../../assets/edit_icon.svg', action: this.edit.bind(this) },
        { title: 'Disable', icon: '../../../assets/Disable.svg', action: this.edit.bind(this) },
        { title: 'Delete', icon: '../../../assets/delete_icon_red.svg', action: this.delete.bind(this) },
      ]
    },
  ];
  async edit(item: any, index: any) {
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, parent_id: this.params.id, type: 'Project',sub_project_update:true } });
  }
  async view(item: any, index: any) {
    console.log(item, index, "item");
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, type: 'Project', view: 'true' } });
  }
  async delete(item: any, index: any) {
    this.delete_sub_project_row.open()
    this.selected_delete_sub_project = item
  }
  async delet_project() {
    try {
      let data = await this.ps?.delete(this.selected_delete_sub_project.id);
       this.parent_project
       window.location.reload()
    } catch (error: any) {
      // this.gs.toastr_shows_function(error?.error?.message, 'Error', 'error')
    }
  }
  plus_minus_open_close(index: number) {
    if (this.plus_minus_index == index) {
      this.plus_minus_index = null;
    } else {
      this.plus_minus_index = index;
    }
  }

}