import { NgClass, NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';


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
  @Input() params_name = '294px';
  @Input() params: any = {};

  router = inject(Router);

  activeTab: string = '';

  ngOnInit(): void {
    this.activeTab = this.defaultActive || (this.tabs.length ? this.tabs[0].name : '');
  }

  selectTab(tab: { name: string, action: () => void }) {
    this.activeTab = tab.name;
    if (this.params_name) {
      this.params[this.params_name] = tab.name;
      this.router.navigate([], { queryParams: this.params });
    }
  }
}