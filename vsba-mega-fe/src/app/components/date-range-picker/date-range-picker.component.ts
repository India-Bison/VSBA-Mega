import { ChangeDetectionStrategy, Component, Injector, Input, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { format } from 'date-fns';
import { CapitalizStringPipe } from '../../pipes/capitaliz-string.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-date-range-picker',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatIconModule, MatNativeDateModule, DatePipe, CapitalizStringPipe],
  standalone: true,
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateRangePickerComponent
    },
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() form_group!:any
  @Input() start_control = '';
  @Input() end_control = '';
  @Input() min:any = '';
  @Input() max:any = '';
  @Input() not_allowed_past_date = false;
  @Input() disabled = false;
  params: any = {}

  value: { start: Date | null; end: Date | null } = { start: null, end: null };

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(private injector: Injector, public ar : ActivatedRoute) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ar.queryParams.subscribe(params => {
      this.params = params
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      } else {
        console.error('Component is missing form control binding');
      }
      if (this.not_allowed_past_date == true) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.min = today;
      }
    }, 100);
  }
  control: any;

  writeValue(val: any): void {
    if (val) {
      this.value = {
        start: val.start ? new Date(val.start) : null,
        end: val.end ? new Date(val.end) : null,
      };
    }
  }

  @ViewChild('picker') picker!: MatDateRangePicker<Date>;

  openPicker() {
    this.picker.open();
  }

  onDateRangeChange(event: any) {
    this.value.start = event.value?.start;
    this.value.end = event.value?.end;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDateChange(): void {
    const formattedValue = {
      start: this.value.start ? format(this.value.start, 'yyyy-MM-dd') : null,
      end: this.value.end ? format(this.value.end, 'yyyy-MM-dd') : null,
    };
    if(this.form_group && this.start_control && this.end_control) {
      this.form_group.get(this.start_control).patchValue(formattedValue.start);
      this.form_group.get(this.end_control).patchValue(formattedValue.end);
    }
    this.onChange(formattedValue);
  }
}