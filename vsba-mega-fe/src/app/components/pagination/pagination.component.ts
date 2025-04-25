import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pagination',
    imports: [FormsModule, NgClass],
    templateUrl: './pagination.component.html',
    standalone: true,
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() items_per_page: EventEmitter<number> = new EventEmitter<number>();

  params: any = {}


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.params.page = params['page'] || 1;
      this.currentPage = parseInt(this.params.page || 1);
    });
  }

  handlePrevClick() {
    if (this.currentPage > 1) {
      this.navigateToPage(parseInt((this.currentPage || 1) + '') - 1);
    }
  }

  handleNextClick() {
    if (this.currentPage < this.totalPages) {
      this.navigateToPage(parseInt((this.currentPage || 1) + '') + 1);
    }
  }

  show_item_per_page(){
    this.onPageChange.emit(this.totalItems);
  }

  navigateToPage(page: number) {
    const queryParams = {
      page: page,
      page_size: this.itemsPerPage,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // existing params maintain karto
    });

    this.onPageChange.emit(page); // page change event emit karto
  }


  renderPageNumbers(): number[] {
    const pageNumbers: number[] = [];
    const displayFirstPages = 2;
    const displayLastPages = 2;

    for (let i = 1; i <= this.totalPages; i++) {
      if (
        i <= displayFirstPages ||
        i > this.totalPages - displayLastPages ||
        (i === this.currentPage && this.currentPage > displayFirstPages && this.currentPage <= this.totalPages - displayLastPages)
      ) {
        pageNumbers.push(i);
      } else if (
        (i === displayFirstPages + 1 && this.currentPage > displayFirstPages + 1) ||
        (i === this.totalPages - displayLastPages && this.currentPage < this.totalPages - displayLastPages)
      ) {
        pageNumbers.push(-1); // Use -1 to represent "..."
      }
    }

    return pageNumbers;
  }

  get showingFrom(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

}
