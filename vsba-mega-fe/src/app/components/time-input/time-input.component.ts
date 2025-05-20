import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-input',
  imports: [FormsModule, NgIf],
  templateUrl: './time-input.component.html',
  // styleUrl: './time-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimeInputComponent,
      multi: true
    }
  ],
  standalone: true,
})
export class TimeInputComponent implements ControlValueAccessor {
  @Input() data_list = []
  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() rounded: boolean = false;
  @Input() is_required: boolean = false;
  @Input() fetch: boolean = false;
  @Input() mask: boolean = false;
  @Input() text_type: boolean = true;
  @Input() type: 'text' | 'password' | 'email' | 'number' | 'text_number' = 'text_number';
  @Input() type_total_latter: number = 0;
  @Output() fetch_activated = new EventEmitter<any>()
  @Output() eye_activated = new EventEmitter<any>()


  paramValue: any;

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
      } else {
        // Component is missing form control binding
      }
    }, 100);
  }
  control: any;
  onTouched: any;
  value = ''
  onChange: (value: any) => void = () => { };


  writeValue(value: any): void {
    this.value = value

  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  fetch_clicked() {
    this.fetch_activated.emit()
  }

  eye_clicked() {
    this.text_type = !this.text_type;
    this.eye_activated.emit(this.text_type);
  }
  validateInput(event: KeyboardEvent): void {
    if (this.type === 'text') {
      const regex = /^[A-Za-z ]$/;
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    } else if (this.type === 'number') {
      const regex = /^[0-9]$/;
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    } else if (this.type === 'text_number') {
      return;
    }
  }

  inputType = 'text';
  is_focused = false;
  hasSelected = false;
showIcon = false; // <-- icon visibility state

onMouseOver() {
  this.inputType = 'time';
  this.showIcon = true; // Show icon on hover
}

onMouseLeave() {
  if (!this.is_focused) {
    this.inputType = 'text';
    this.showIcon = false; // Hide icon if not focused
  }
}

focus(value: boolean) {
  this.is_focused = value;
  if (!value) {
    this.inputType = 'text';
    this.showIcon = false; // Hide icon on blur
  } else {
    this.showIcon = true; // Keep icon visible on focus
  }
}


@ViewChild('time_input') time_input:any;

  openPicker() {
    this.time_input.nativeElement.showPicker?.(); // Most modern browsers
    // fallback:
    this.time_input.nativeElement.focus();
    this.time_input.nativeElement.click();
  }
}
