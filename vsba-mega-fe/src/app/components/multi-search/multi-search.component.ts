import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-multi-search',
    imports: [FormsModule, NgFor, NgIf],
    templateUrl: './multi-search.component.html',
    styleUrl: './multi-search.component.css'
})
export class MultiSearchComponent {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  allOptions = ['Classroom', 'Computer Lab', 'Chemistry Lab', 'Library', 'Auditorium'];
  selectedOptions: string[] = [];
  filteredOptions: string[] = [...this.allOptions];
  searchText = '';
  dropdownOpen = false;
  highlightedIndex = 0;
  maxSelections = 3;

  filterOptions() {
    const text = this.searchText.toLowerCase();
    this.filteredOptions = this.allOptions.filter(option =>
      option.toLowerCase().includes(text)
    );
  }

  selectOption(option: string) {
    if (this.selectedOptions.includes(option)) {
      this.removeItem(option);
    } 
    this.selectedOptions.push(option);
    this.scrollToRight();
    // else if (this.selectedOptions.length < this.maxSelections) {
    // }

    this.searchText = '';
    this.highlightedIndex = 0;
    this.filterOptions();
  }

  removeItem(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.filterOptions();
  }

  clearAll() {
    this.selectedOptions = [];
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
          this.filterOptions();
        }
        break;
    }
  }

  private scrollToRight() {
    setTimeout(() => {
      if (this.scrollContainer && this.scrollContainer.nativeElement) {
        this.scrollContainer.nativeElement.scrollLeft = this.scrollContainer.nativeElement.scrollWidth;
      }
    });
  }

}
