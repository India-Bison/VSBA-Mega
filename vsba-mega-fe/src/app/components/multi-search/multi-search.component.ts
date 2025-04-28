import { NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-search',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './multi-search.component.html',
  styleUrl: './multi-search.component.css',
  standalone: true,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: MultiSearchComponent
    }
],
})
export class MultiSearchComponent implements ControlValueAccessor {
  @Input() label = 'Search';
  @Input() options: string[] = [];  // <-- Add this to accept options from parent
  
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  
  selectedOptions: string[] = [];
  filteredOptions: string[] = [];
  searchText = '';
  dropdownOpen = false;
  highlightedIndex = 0;
  maxSelections = 3;
  
  // When input options come from parent, initialize filteredOptions
  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && changes['options'].currentValue) {
      this.filteredOptions = [...this.options];
    }
  }
  
  
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: string[]): void {
    if (Array.isArray(value)) {
      this.selectedOptions = value;
    } else {
      this.selectedOptions = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: tuzya component la disabled state handle karaychi asel tar
  }

  filterOptions() {
    const text = this.searchText.toLowerCase();
    this.filteredOptions = (this.options || []).filter(option =>
      option.toLowerCase().includes(text)
    );
  }
  
  selectOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    
    if (index === -1) {
      // Add if not already selected and limit not reached
      if (this.selectedOptions.length < this.maxSelections) {
        this.selectedOptions.push(option);
      }
    } else {
      // Remove if already selected
      this.selectedOptions.splice(index, 1);
    }
  
    this.onChange(this.selectedOptions);
    this.searchText = '';
    this.highlightedIndex = 0;
    this.filterOptions();
  }
  
  
  
  
  removeItem(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.onChange(this.selectedOptions); 
    this.filterOptions();
  }
  
  clearAll() {
    this.selectedOptions = [];
    this.onChange(this.selectedOptions); 
    this.filterOptions();
  }
  
  handleKeyDown(event: KeyboardEvent) {
    const optionCount = this.filteredOptions.length;
  
    switch (event.key) {
      case 'ArrowDown':
        this.highlightedIndex = (this.highlightedIndex + 1) % optionCount;
        event.preventDefault();
        break;
  
      case 'ArrowUp':
        this.highlightedIndex = (this.highlightedIndex - 1 + optionCount) % optionCount;
        event.preventDefault();
        break;
  
      case 'Enter':
        const highlightedOption = this.filteredOptions[this.highlightedIndex];
        if (highlightedOption) {
          this.selectOption(highlightedOption);
        } else if (this.searchText.trim()) {
          this.selectOption(this.searchText.trim());
        }
        event.preventDefault();
        break;
  
      case 'Backspace':
        if (!this.searchText && this.selectedOptions.length) {
          this.selectedOptions.pop();
          this.onChange(this.selectedOptions); 
          this.filterOptions();
        }
        break;
    }
  }
  
  private scrollToRight() {
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollLeft = this.scrollContainer.nativeElement.scrollWidth;
      }
    });
  }
  
}
