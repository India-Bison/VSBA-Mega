import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-month-hrs-input',
  imports: [],
  templateUrl: './month-hrs-input.component.html',
  styleUrl: './month-hrs-input.component.css',
  standalone:true,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: MonthHrsInputComponent,
        multi: true
    }
],
})
export class MonthHrsInputComponent implements ControlValueAccessor {
  @Input() hourLabel: string = 'Hours';
  @Input() minuteLabel: string = 'Mins';

  hours: number = 0;
  minutes: number = 0;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    if (value) {
      const [h, m] = value.split(':').map(v => parseInt(v, 10));
      this.hours = isNaN(h) ? 0 : h;
      this.minutes = isNaN(m) ? 0 : m;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private emitValue() {
    const formatted = `${this.hours.toString().padStart(2, '0')}:${this.minutes
      .toString()
      .padStart(2, '0')}`;
    this.onChange(formatted);
  }

  increment(type: 'hour' | 'minute') {
    if (type === 'hour') {
      this.hours = this.hours === 23 ? 0 : this.hours + 1;
    } else {
      this.minutes = this.minutes === 59 ? 0 : this.minutes + 1;
    }
    this.emitValue();
  }

  decrement(type: 'hour' | 'minute') {
    if (type === 'hour') {
      this.hours = this.hours === 0 ? 23 : this.hours - 1;
    } else {
      this.minutes = this.minutes === 0 ? 59 : this.minutes - 1;
    }
    this.emitValue();
  }
}