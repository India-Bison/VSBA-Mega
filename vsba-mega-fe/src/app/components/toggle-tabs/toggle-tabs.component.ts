import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-toggle-tabs',
    imports: [NgClass, NgFor],
    templateUrl: './toggle-tabs.component.html'
})
export class ToggleTabsComponent {
  @Input() tabs: { name: string, action: () => void }[] = [];
  @Input() defaultActive: string = '';
  @Input() width = '294px'; 

  activeTab: string = '';

  ngOnInit(): void {
    this.activeTab = this.defaultActive || (this.tabs.length ? this.tabs[0].name : '');
  }

  selectTab(tab: { name: string, action: () => void }) {
    this.activeTab = tab.name;
    tab.action();
  }
}