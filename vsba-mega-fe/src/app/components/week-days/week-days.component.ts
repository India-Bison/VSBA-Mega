import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-week-days',
    imports: [CommonModule, NgFor],
    templateUrl: './week-days.component.html',
    styleUrl: './week-days.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: WeekDaysComponent
        }
    ]
})
export class WeekDaysComponent implements ControlValueAccessor {
  days = [
    { short: 'S', full: 'sunday' },
    { short: 'M', full: 'monday' },
    { short: 'T', full: 'tuesday' },
    { short: 'W', full: 'wednesday' },
    { short: 'T', full: 'thursday' },
    { short: 'F', full: 'friday' },
    { short: 'S', full: 'saturday' }
  ];

  selected: Set<string> = new Set();

  onChange = (_: any) => {};
  onTouched = () => {};

  toggle(day: string) {
    if (this.selected.has(day)) {
      this.selected.delete(day);
    } else {
      this.selected.add(day);
    }
    this.onChange(Array.from(this.selected).join(','));
    this.onTouched();
  }
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.selected = new Set(value);
    } else if (typeof value === 'string') {
      const arr = value.split(',').map((v: any) => v.trim());
      this.selected = new Set(arr);
    } else {
      this.selected = new Set();
    }
  }
  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}