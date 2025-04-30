import { ChangeDetectionStrategy, Component, Injector, Input, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-range-picker',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatDatepickerModule, JsonPipe, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatIconModule, MatNativeDateModule, DatePipe
  ],
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

  value: { start: Date | null; end: Date | null } = { start: null, end: null };

  onChange = (_: any) => { };
  onTouched = () => { };

  constructor(private injector: Injector){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      } else {
        console.error('Component is missing form control binding');
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
    this.onChange(formattedValue);
  }
}