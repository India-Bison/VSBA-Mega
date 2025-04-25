import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-date-range',
    imports: [FormsModule, DatePipe, NgClass],
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.css'
})
export class DateRangeComponent {
  @Input() label: string = 'Date Range';
  @Input() width: string = '';
  @Input() from_key: string = 'from_date';
  @Input() to_key: string = 'to_date';
  @Input() current_date: boolean = false;
  @Input() filter: boolean = false;

  @Input() formcontrolname_start_date: string = '';
  @Input() formcontrolname_end_date: string = '';

  selected_start_date: string = '';
  selected_end_date: string = '';

  params: any = {};
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private router: Router, private ar: ActivatedRoute) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];

    this.ar.queryParams.subscribe(params => {
      this.params = { ...params };
      if (this.filter) {
        this.selected_start_date = params[this.from_key] || (this.current_date ? today : '');
        this.selected_end_date = params[this.to_key] || '';
        if (this.current_date) {
          this.update_query_params();
        }
      }
    });
  }

  openDatePicker(type: 'start' | 'end') {
    const id = type === 'start' ? this.from_key + '_startDate' : this.to_key + '_endDate';
    const inputElement = document.getElementById(id) as HTMLInputElement;
    inputElement?.showPicker();
  }

  date_change(type: 'start' | 'end', event: any) {
    const selectedDate = event.target.value;

    if (type === 'start') {
      this.selected_start_date = selectedDate;
      if (!this.selected_start_date) this.selected_end_date = '';
      if (this.selected_end_date && new Date(this.selected_end_date) < new Date(this.selected_start_date)) {
        this.selected_end_date = '';
      }
    } else {
      if (this.selected_start_date && new Date(selectedDate) < new Date(this.selected_start_date)) {
        this.selected_end_date = '';
      } else {
        this.selected_end_date = selectedDate;
      }
    }

    if (this.filter) {
      this.update_query_params();
    } else {
      this.onChange({
        [this.from_key]: this.selected_start_date,
        [this.to_key]: this.selected_end_date
      });
    }
  }

  async update_query_params() {
    this.router.navigate([], {
      relativeTo: this.ar,
      queryParams: {
        [this.from_key]: this.selected_start_date || null,
        [this.to_key]: this.selected_end_date || null
      },
      queryParamsHandling: 'merge',
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.selected_start_date = value[this.from_key] || '';
      this.selected_end_date = value[this.to_key] || '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}