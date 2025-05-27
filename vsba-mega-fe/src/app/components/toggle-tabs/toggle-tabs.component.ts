import { NgClass, NgFor } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-toggle-tabs',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './toggle-tabs.component.html'
})
export class ToggleTabsComponent {
  @Input() tabs: { name: string, action: () => void }[] = [];
  @Input() defaultActive: string = '';
  @Input() width = '294px';
  @Input() params_name = 'type';
  @Input() params: any = {};
  @Input() disabled: any = false;
  @Input() value_on_params: boolean = false;


  router = inject(Router);
  ar = inject(ActivatedRoute)

  activeTab: string = '';
 ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultActive'] && changes['defaultActive'].currentValue) {
      this.activeTab = changes['defaultActive'].currentValue;
    }
  }
  
  ngOnInit(): void {
    this.activeTab = this.defaultActive || (this.tabs.length ? this.tabs[0].name : '');
  }

  selectTab(tab: { name: string, action: () => void }) {
    if(!this.disabled){
      if (!this.disabled && typeof tab.action === 'function') {
        tab.action();
      }    
      this.activeTab = tab.name;
      if (!this.value_on_params && this.params_name) {
        this.params[this.params_name] = tab.name;
        this.router.navigate([], { queryParams: this.params });
      }
    }
    
    // if (this.params.status == 'All') {
    //   this.router.navigate([], {
    //     relativeTo: this.ar,
    //     queryParams: { status: null },
    //     queryParamsHandling: 'merge'
    //   });
    // }
  }
  
}