import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [FormsModule,DatePipe,NgClass],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css'
})
export class DateRangeComponent {
  @Input() label: string = 'Date Range';
  @Input() width: string = ''
  @Input() from_key: string = 'from_date';
  @Input() to_key: string = 'to_date';
  selected_start_date: any = '';
  selected_end_date: any = '';
  @Input() current_date: boolean = false;
  params: any = {};
  constructor(private router: Router, private ar: ActivatedRoute,) { }
  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.ar.queryParams.subscribe(params => {
      this.params = { ...params };
      this.selected_start_date = params[this.from_key] || (this.current_date ? today : '');
      this.selected_end_date = params[this.to_key] || '';
      if (this.current_date == true) {
        this.update_query_params();
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
      if (!this.selected_start_date) {
        this.selected_end_date = '';
      }
      if (this.selected_end_date && new Date(this.selected_end_date) < new Date(this.selected_start_date)) {
        // this.gs.toastr_shows_function('End date cannot be earlier than start date.', '', 'info');
        this.selected_end_date = '';
      }
    } else {
      if (this.selected_start_date && new Date(selectedDate) < new Date(this.selected_start_date)) {
        // this.gs.toastr_shows_function('End date cannot be earlier than start date.', '', 'info');
        this.selected_end_date = '';
      } else {
        this.selected_end_date = selectedDate;
      }
    }
    this.update_query_params();
  }

  async update_query_params() {
    this.router.navigate([], {
      relativeTo: this.ar,
      queryParams: {
        [this.from_key]: this.selected_start_date || null,
        [this.to_key]: this.selected_end_date || null,
      },
      queryParamsHandling: 'merge',
    });
  }

}
