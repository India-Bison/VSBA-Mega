import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
    selector: 'app-search-input',
    imports: [FormsModule, ReactiveFormsModule,NgIf],
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.css',
    standalone: true,
})
export class SearchInputComponent {
  @Input() placeholder: string = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled: boolean = false;

  value: string = '';
  private searchSubject = new Subject<string>();

  constructor(public route: Router, public ar: ActivatedRoute) {}

  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      this.value = params['search'] || '';
    });

    this.searchSubject
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe(val => {
        this.valueChange.emit(val);
        this.route.navigate([], {
          relativeTo: this.ar,
          queryParams: { search: val || null },
          queryParamsHandling: 'merge',
        });
      });
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.searchSubject.next(this.value);
  }
  clearInput() {
  this.value = '';
  this.searchSubject.next(this.value);
}

  // Optional ControlValueAccessor support
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