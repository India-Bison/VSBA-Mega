import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-search-input',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.css',
    standalone: true,
})
export class SearchInputComponent {
    @Input() placeholder: any = '';
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  
    value: string = '';
  
    onInputChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.value = inputElement.value;
      this.valueChange.emit(this.value);
    }
  
    @Input() disabled: boolean = false;
  
    control: any;
    onChange: any;
    onTouched: any;
  
    writeValue(value: any): void {
      this.value = value;
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
}
