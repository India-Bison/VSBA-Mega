import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor,NgClass],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectInputComponent
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() icon = '';
  @Input() label = '';
  @Input() options: Array<{ value: any, title: string }> = [];
  @Input() placeholder = '';
  @Input() disabled: boolean = false;
  @Input() is_required: boolean = false;
  @Input() clearFunction: (() => void) | null = null;

  @Output() valueChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  control: FormControl | null = null;
  value: any = '';
  display_value = '';
  display_object: any = {};
  paramValue: any;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private route: ActivatedRoute, private injector: Injector, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramValue = params['view'];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['value']) {
      this.change_display_value(this.value);
    }
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
    this.value = value;
    this.change_display_value(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  change_display_value(value: string): void {
    const found = this.options?.find(item => item.value === value);
    this.display_value = found?.title || '';
    this.display_object = found;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  clearSelection(): void {
    if (this.clearFunction) {
      this.clearFunction();
    }
    this.value = '';
    this.display_value = '';
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.clear.emit();
  }

  handleSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.change_display_value(selectedValue);
  }
}