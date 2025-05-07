import { CommonModule, NgFor } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-radio',
    imports: [FormsModule, NgFor, CommonModule,],
    templateUrl: './radio.component.html',
    styleUrl: './radio.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RadioComponent,
            multi: true
        }
    ],
    standalone: true,
})
export class RadioComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: string }[] = [];
  @Input() label: string = '';
  @Input() is_required: boolean = false;
  @Input() selected_value: string = '';
  value: string = '';
  params: any = {}
  onChange = (value: string) => {};
  onTouched = () => {};

  control: any;
  constructor(public injector: Injector, public ar : ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ar.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const ngControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control;
        if (!this.control.value && this.selected_value) {
          this.select(this.selected_value);
          this.control.setValue(this.selected_value, { emitEvent: false });
        }
      }
    });
  }
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