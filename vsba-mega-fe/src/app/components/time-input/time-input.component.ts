import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CapitalizStringPipe } from '../../pipes/capitaliz-string.pipe';

@Component({
  selector: 'app-time-input',
  imports: [FormsModule, NgIf, CapitalizStringPipe],
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
}
