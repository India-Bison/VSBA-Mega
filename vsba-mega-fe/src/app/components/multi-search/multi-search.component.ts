import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-search',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './multi-search.component.html',
  styleUrl: './multi-search.component.css'
})
export class MultiSearchComponent {

  allOptions = ['Classroom', 'Computer Lab', 'Chemistry lab'];
  selectedOptions: string[] = [];
  filteredOptions: string[] = [...this.allOptions];
  searchText = '';
  dropdownOpen = false;

  filterOptions() {
    const text = this.searchText.toLowerCase();
    this.filteredOptions = this.allOptions.filter(
      option => option.toLowerCase().includes(text) && !this.selectedOptions.includes(option)
    );
  }

  selectOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions.push(option);
      this.searchText = '';
      this.filterOptions();
    }
  }

  removeItem(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.filterOptions();
  }

  highlightedIndex = 0;

handleKeyDown(event: KeyboardEvent) {
  const optionCount = this.filteredOptions.length;

  switch (event.key) {
    case 'ArrowDown':
      if (optionCount > 0) {
        this.highlightedIndex = (this.highlightedIndex + 1) % optionCount;
        event.preventDefault();
      }
      break;

    case 'ArrowUp':
      if (optionCount > 0) {
        this.highlightedIndex = (this.highlightedIndex - 1 + optionCount) % optionCount;
        event.preventDefault();
      }
      break;

    case 'Enter':
      if (this.filteredOptions[this.highlightedIndex]) {
        this.selectOption(this.filteredOptions[this.highlightedIndex]);
      } else if (this.searchText.trim()) {
        this.selectOption(this.searchText.trim());
      }
      this.searchText = '';
      this.highlightedIndex = 0;
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

}
