import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: RadioComponent,
        multi: true
      }
    ]
})
export class RadioComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: string }[] = [];

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(val: string): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}