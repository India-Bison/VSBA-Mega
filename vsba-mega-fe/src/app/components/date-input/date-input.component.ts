import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { format } from 'date-fns';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CapitalizStringPipe } from '../../pipes/capitaliz-string.pipe';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-date-input',
  imports: [CommonModule, NgIf, FormsModule, CapitalizStringPipe, NgClass],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateInputComponent
    }
  ],
  standalone: true,
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() is_required: boolean = false;
  @Input() placeholder = '';
  @Input() format: 'date' | 'time' | 'month' = 'date';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() rounded: boolean = false;
  @Input() minDateInput: string | null = null;  // Minimum date input
  @Input() maxDateInput: string | null = null;  // Maximum date input
  @Input() current_date: boolean = false;
  @Output() dateSelected = new EventEmitter<string>();

  paramValue: any;
  control: any;
  value: any = '';
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private injector: Injector, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramValue = params['view'];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      }
    }, 100);
  }

  writeValue(value: any): void {
    if (this.current_date) {
      const now = new Date();
      this.value = this.format === 'time'
        ? format(now, 'HH:mm')
        : this.format === 'month'
          ? format(now, 'yyyy-MM')
          : format(now, 'yyyy-MM-dd');
    } else if (value && !isNaN(new Date(value).getTime())) {
      const parsedDate = new Date(value);
      this.value = this.format === 'time'
        ? format(parsedDate, 'HH:mm')
        : this.format === 'month'
          ? format(parsedDate, 'yyyy-MM')
          : format(parsedDate, 'yyyy-MM-dd');
    } else if (this.format === 'month') {
      const today = new Date();
      this.value = format(today, 'yyyy-MM');
      this.onChange?.(this.value);
      this.dateSelected.emit(this.value);
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  inputType = 'text';
  hasSelected = false;
  onMouseOver() {
    console.log('onMouseOver');
    this.hasSelected = true;
    if (!this.hasSelected || true) {
      this.inputType = 'time';
    }
  }

  onMouseLeave() {
    if (!this.is_focused) {
      this.inputType = 'text';
    }
  }

  is_focused = false;
  focus(value: any) {
    this.is_focused = value;
    if (!value) {
      this.inputType = 'text';
    }
  }

  onDateChange(event: any) {
    let eventt = event.target.value
    // if (!eventt || eventt === '') {
    //   return;
    // }

    if (this.format === 'time') {
      const [hour, minute] = eventt.split(':').map(Number);
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      date.setSeconds(0);
      const formatted = new Intl.DateTimeFormat(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);

      this.value = formatted;
      this.hasSelected = true;
      this.inputType = 'time';
      this.onChange(this.value);
      this.dateSelected.emit(this.value);
    } else if (this.format === 'month') {
      eventt = eventt.substring(0, 7);
    }
    this.onChange(eventt);
    this.dateSelected.emit(eventt);
  }

  is12HourFormat(): boolean {
    const date = new Date(Date.UTC(2020, 0, 1, 13, 0, 0)); // 1 PM - स्पष्ट differentiation साठी
    const timeString = date.toLocaleTimeString(navigator.language);
    return /am|pm/i.test(timeString);
  }

  changeMonth(step: number) {
    let year: number, month: number;
    if (this.value) {
      [year, month] = this.value.split('-').map(Number);
    } else {
      const today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() + step);
    this.value = format(currentDate, 'yyyy-MM');
    this.onChange(this.value);
    this.dateSelected.emit(this.value);
  }

}