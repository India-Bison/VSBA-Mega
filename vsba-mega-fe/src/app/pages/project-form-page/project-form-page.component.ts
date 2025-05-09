import { Component, ViewChild } from '@angular/core';
import { ToggleTabsComponent } from '../../components/toggle-tabs/toggle-tabs.component';
import { RadioComponent } from '../../components/radio/radio.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { TextAreaComponent } from "../../components/text-area/text-area.component";
import { WeekDaysComponent } from '../../components/week-days/week-days.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DateRangePickerComponent } from '../../components/date-range-picker/date-range-picker.component';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationPopupComponent } from '../../components/confirmation-popup/confirmation-popup.component';
import { MultiSearchComponent } from '../../components/multi-search/multi-search.component';
import { ProjectService } from '../../services/project.service';
import { ImageUploderComponent } from '../../components/image-uploder/image-uploder.component';
import { HalfHrsOptionsListPipe } from '../../pipes/half-hrs-options-list.pipe';
import { SubResourceTypePipe } from '../../pipes/sub-resource-type.pipe';
import { TimeInputComponent } from '../../components/time-input/time-input.component';
import { SortListPipe } from '../../pipes/sort-list.pipe';

@Component({
  selector: 'app-project-form-page',
  imports: [ToggleTabsComponent, RadioComponent, TimeInputComponent, MultiSearchComponent, TextInputComponent, SelectInputComponent, TextAreaComponent, WeekDaysComponent, ButtonComponent, FormsModule, ReactiveFormsModule, NgFor, NgIf, ListComponent, CommonModule, HeaderComponent, DateRangePickerComponent, ConfirmationPopupComponent, ImageUploderComponent, DatePipe, HalfHrsOptionsListPipe, SubResourceTypePipe, RouterLink,SortListPipe],
  templateUrl: './project-form-page.component.html',
  standalone: true,
})
export class ProjectFormPageComponent {
  params: any = {};
  project_start_end_date: any = {};
  slot_start_end_date: any = {};
  show_slot_dates_error: boolean = false;
  plus_minus_index: any = 0;
  today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  @ViewChild('confirmation_popup') confirmation_popup: any;
  @ViewChild('submit_Form_page') submit_Form_page: any;
  @ViewChild('discard_popup_toggle') discard_popup_toggle: any;
  tabList: any[] = [
    {
      name: 'Project',
      action: this.project_toggle_action.bind(this, { value: 'Project' })
    },
    {
      name: 'Sub-Project',
      action: this.project_toggle_action.bind(this, { value: 'Sub-Project' })
    }
  ];
  form: FormGroup;
  constructor(private fb: FormBuilder, public gs: GlobalService, public ar: ActivatedRoute, public route: Router, public ps: ProjectService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      full_venue_required: ['', [Validators.required]],
      resource_type: [''],
      description: ['', [Validators.required]],
      audit_required: ['', [Validators.required]],
      project_start_date: ['', [Validators.required]],
      project_end_date: [''],
      week_days: [['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']],
      slot_type: [''],
      type: [''],
      project_logo: [''],
      slot_groups: this.fb.array([])
    });
    if (!this.params.id) {
      this.add_slot()
    }
  }
  parent_project: any
  ngOnInit() {
    console.log(this.form.get('type')?.value);

    this.ar.queryParams.subscribe(async params => {
      this.params = { ...params };
      if (this.params.id) {
        this.patch_project_form(this.params.id);
      }
      if (this.params.parent_id || this.params.id) {
        this.parent_project = (await this.ps?.get(this.params.parent_id ? this.params.parent_id : this.params.id))?.data;
      }
    })
  }
  get slots(): FormArray {
    return this.form.get('slot_groups') as FormArray;
  }
  selected_toggle: any = {}
  project_toggle_action(item: any) {
    this.discard_popup_toggle.open();
    this.selected_toggle = item
  }
  add_slot(): void {
    const slotGroup = this.fb.group({
      slot_start_date: ['', Validators.required],
      slot_end_date: ['', Validators.required],
      slot_time: [''],
      start_time: [''],
      end_time: [''],
      hours: [''],
      slot_time_group: [[]]
    });
    this.slots.push(slotGroup);
    this.slot_start_end_date = {}
    this.plus_minus_index = 0;
  }
  remove_slot(index: number): void {
    if (this.slots.length > 1 || true) {
      this.slots.removeAt(index);
    }
  }
  plus_minus_open_close(index: number) {
    if (this.plus_minus_index == index) {
      this.plus_minus_index = null;
    } else {
      this.plus_minus_index = index;
    }
  }
  add_pill(index: number): void {
    const slot_group = this.slots.at(index) as FormGroup;
    const slot_time = slot_group.get('slot_time')?.value;
    const hours_value = slot_group.get('hours')?.value;
    if (slot_time && hours_value) {
      const [slotHour, slotMinute] = slot_time.split(':').map(Number);
      const [durHour, durMinute] = hours_value.split(':').map(Number);
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), slotHour, slotMinute);
      const end = new Date(start);
      end.setHours(end.getHours() + durHour);
      end.setMinutes(end.getMinutes() + durMinute);
      const formatTime = (date: Date): string => {
        let hrs = date.getHours();
        const mins = String(date.getMinutes()).padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12 || 12;
        return `${String(hrs).padStart(2, '0')}:${mins} ${ampm}`;
      };
      const pillText = `${formatTime(start)} - ${formatTime(end)}`;
      const currentPills: string[] = slot_group.get('slot_time_group')?.value || [];
      if (!currentPills.includes(pillText)) {
        currentPills.push(pillText);
        slot_group.get('slot_time_group')?.setValue(currentPills);
        slot_group.get('slot_time_group')?.markAsDirty();
        slot_group.get('slot_time_group')?.updateValueAndValidity();
      }
    }
  }
  remove_pill(slot_index: number, pill_index: number): void {
    const slotGroup = this.slots.at(slot_index) as FormGroup;
    const currentPills = slotGroup.get('slot_time_group')?.value || [];
    currentPills.splice(pill_index, 1);
    slotGroup.get('slot_time_group')?.setValue(currentPills);
  }

  async submit_form(route?: any) {
    this.apply_slot_validations();
    if (this.form.valid) {
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
    } else {
      this.form.markAllAsTouched();
    }
  }
  async update() {
    try {
      let data = { ...this.form.value };
      if (this.params.sub_project_update == 'true' || this.params.parent_id) {
        data.type = 'Sub-Project'
        data.parent_id = parseInt(this.params.parent_id)
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
    this.form.reset({
      week_days: this.form.get('week_days')?.value,
      type: 'Sub-Project'
    });
    console.log(this.parent_project, "ooooooooo");

    console.log(this.form.value);

    this.route.navigate([], { queryParams: { type: 'Project', parent_id: this.params.parent_id || this.params.id } });
  }

  back_to_page() {
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
          slot_time: slot.slot_time,
          start_time: slot.start_time,
          end_time: slot.end_time,
          hours: slot.hours,
          slot_time_group: this.fb.control(slot.slot_time_group || [])
        }));
        this.slot_start_end_date.push({
          start: slot.slot_start_date || null,
          end: slot.slot_end_date || null
        });
      });
    } else {
      console.log('Slot group empty aahe');
      this.add_slot();
    }
    this.project_start_end_date = {
      start: dataa.data.project_start_date || null,
      end: dataa.data.project_end_date || null
    }
  }
  discard_toggle() {
      this.route.navigate([], {
        relativeTo: this.ar,
        queryParams: { type: this.selected_toggle.value },
        queryParamsHandling: 'merge'
      });
      console.log("ooooooooo");
  }
  discard_button() {
      this.route.navigate(['/project/list']);
      console.log("ppppppppp");
  }

  cancel_discrad() {
    window.location.reload()
    this.discard_popup_toggle.close()
  }

  async save_as_darft() {
    let data = { ...this.form.value };
    data.status = 'Drafts'
    data.type = this.params.type
    let response: any = await this.ps.add(data)
    this.route.navigate(['/project/list'], {})
  }

  // sub project list

  @ViewChild('delete_sub_project_row') delete_sub_project_row: any
  selected_delete_sub_project: any = {}
  columns: any = [
    { title: 'Sr. No.', type: 'Index', key: 'index' },
    { title: 'Sub-Project Name', type: 'Value', key: 'name', class: 'text-left' },
    { title: 'Resource Type', type: 'Value', key: 'resource_type', class: 'text-left', sort: true },
    { title: 'Slot Type', type: 'Value', key: 'slot_type', class: 'text-left', sort: true },
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
    this.route.navigate(['/project/form'], { queryParams: { id: item.id, parent_id: this.params.id, type: 'Project', sub_project_update: true } });
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
  apply_slot_validations(): void {
    const slotType = this.form.get('slot_type')?.value;
    this.slots.controls.forEach((slotGroup: any) => {
      if (slotType == 'Full Day') {
        slotGroup.get('start_time')?.setValidators([Validators.required]);
        slotGroup.get('end_time')?.setValidators([Validators.required]);
        slotGroup.get('slot_time')?.clearValidators();
        slotGroup.get('hours')?.clearValidators();
      } else if (slotType == 'Time Slot') {
        slotGroup.get('slot_time')?.setValidators([Validators.required]);
        slotGroup.get('hours')?.setValidators([Validators.required]);
        slotGroup.get('start_time')?.clearValidators();
        slotGroup.get('end_time')?.clearValidators();
      } else {
        slotGroup.get('start_time')?.clearValidators();
        slotGroup.get('end_time')?.clearValidators();
        slotGroup.get('slot_time')?.clearValidators();
        slotGroup.get('hours')?.clearValidators();
      }

      ['start_time', 'end_time', 'slot_time', 'hours'].forEach(control => {
        slotGroup.get(control)?.updateValueAndValidity();
      });
    });
  }
  show_error_on_slot_dates() {
    const start = this.form.get('project_start_date')?.value;
    const end = this.form.get('project_end_date')?.value;
    if (!start || !end) {
      this.show_slot_dates_error = true;
      setTimeout(() => this.show_slot_dates_error = false, 5000);
    }
  }
  

}