import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarExpanded = false;
  hiddenScrollbar = true;
  // showTooltip = false;
  scrollbar: any = 200;

  @Output() logout_clicked : any = new EventEmitter();

  // Role and permissions
  userRole: string = '';
  userPermissions: string[] = [];

  // Submenu control
  expandedSubmenuIndex: number | null = null;
  selected_submenu: any[] = [];
  is_submenu_open = false;
  submenuCloseTimeout: any;
  scrollPosition = 0;

  constructor(public router: Router, public ar: ActivatedRoute) { }

  ngOnInit() {
    this.checkCurrentUrl();

    // Filter sidebar items by user role
    const userRole = 'Instructor';
    this.sidebar = this.filterSidebarByRole(this.sidebar, userRole);

    // Open a default submenu on init
    this.openSubmenu(this.sidebar[3]?.submenu || []);

    this.is_submenu_open = false;

    // Track route changes to highlight active sidebar item
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveSidebarItem(event.urlAfterRedirects);
      }
    });

    // Uncomment below if needed for future role-based permission filtering
    /*
    this.userRole = this.gs.userRole;
    this.userPermissions = this.gs.role_based_permissions[this.userRole] || [];
  
    this.filteredSidebar = this.sidebar.filter((item: any) => {
      if (!item.permissions) return false;
      return item.permissions.some((perm: string) => this.userPermissions.includes(perm));
    });
    */
  }

  /** Toggle the sidebar's expanded/collapsed state */
  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  /** Handles the logic to toggle submenus open/close by index */
  toggleSubmenu(index: number): void {
    this.expandedSubmenuIndex = (this.expandedSubmenuIndex === index) ? null : index;
  }

  /** Set the selected sidebar item by label */
  selectItem(label: string): void {
    this.sidebar.forEach((item: any) => item.selected = false);
    const selectedItem = this.sidebar.find((item: any) => item.label === label);
    if (selectedItem) selectedItem.selected = true;
  }

  /** Checks current route and highlights the active item */
  checkCurrentUrl() {
    const currentUrl = this.router.url;
    this.sidebar.forEach((item: any) => {
      item.selected = item.router_link === currentUrl;
    });
  }

  /** Filter sidebar items recursively based on user role */
  filterSidebarByRole(sidebar: any[], userRole: string): any[] {
    return sidebar
      .filter(item => !item.roles || item.roles.includes(userRole))
      .map(item => {
        if (item.submenu?.length) {
          item.submenu = this.filterSidebarByRole(item.submenu, userRole);
        }
        return item;
      });
  }

  /** Open a submenu and show it */
  openSubmenu(submenu: any[]) {
    this.selected_submenu = submenu;
    this.is_submenu_open = submenu.length > 0;
    this.hiddenScrollbar = this.is_submenu_open;
  }

  /** Reopen submenu and cancel any close timeout */
  reOpenSubmenu(submenu: any) {
    clearTimeout(this.submenuCloseTimeout);
    this.selected_submenu = submenu;
    this.is_submenu_open = true;
  }

  /** Close submenu after a delay (e.g., on mouse leave) */
  closeSubmenuWithDelay() {
    this.submenuCloseTimeout = setTimeout(() => {
      this.is_submenu_open = false;
      this.expandedSubmenuIndex = null
    }, 800);
  }

  /** Cancel the delayed submenu closing */
  cancelSubmenuClose() {
    clearTimeout(this.submenuCloseTimeout);
  }

  /** Emit logout event and clear local storage */
  logout_emitter() {
    this.logout_clicked.emit(true);
    localStorage.clear();
  }

  /** Set the active sidebar item based on current route */
  setActiveSidebarItem(currentRoute: string): void {
    this.sidebar.forEach((item: any) => {
      item.selected = false;

      // Check direct match
      if (item.router_link === currentRoute) {
        item.selected = true;
      }

      // Check flat submenu
      item.submenu?.forEach((sub: any) => {
        if (sub.router_link === currentRoute) item.selected = true;

        // Check nested submenu
        if (Array.isArray(sub.submenu)) {
          sub.submenu.forEach((nested: any) => {
            if (nested.router_link === currentRoute) item.selected = true;
          });
        }
      });
    });
  }

  /*
  // Optional scroll tracking logic (can be uncommented if needed)
  scrolling() {
    const el = this.scrollableDiv.nativeElement;
    el.addEventListener('scroll', () => {
      this.scrollbar = el.scrollTop;
      console.log('Scroll position:', this.scrollbar);
    });
    this.is_submenu_open = false;
  }
  
  // Optional scroll position tracking
  onScroll(element: HTMLElement): void {
    console.log('Scroll Position:', element.scrollTop);
    this.scrollPosition = this.scrollContainer.nativeElement.scrollTop;
    this.is_submenu_open = false;
  }
  */

  tooltipText = '';
  @ViewChild('tooltipRef') tooltipRef!: ElementRef;

  showTooltip(event: MouseEvent, text: string) {
    this.tooltipText = text;
    const tooltip = this.tooltipRef.nativeElement as HTMLElement;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    tooltip.style.left = `${rect.left + rect.width / 0}px`;
    tooltip.style.top = `${rect.top - 55}px`;
    tooltip.classList.remove('invisible', 'opacity-0');
    tooltip.classList.add('visible', 'opacity-80');
  }

  hideTooltip() {
    const tooltip = this.tooltipRef.nativeElement as HTMLElement;
    tooltip.classList.add('invisible', 'opacity-0');
    tooltip.classList.remove('visible', 'opacity-100');
  }


  sidebar: any = [
    {
      id: 1,
      label: 'Home',
      icon: '../../../assets/CalendarBlank.png',
      selected_icon: '../../../assets/CalendarBlank.png',
      selected: false,
      router_link: '/dashboard-home',
      submenu: [],
      permissions: "home:view"


    },
    {
      id: 2,
      label: 'Dashboard',
      icon: '../../../assets/CalendarBlank.png',
      selected_icon: '../../../assets/CalendarBlank.png',
      selected: false,
      router_link: '/dashboard',
      submenu: [],
      permissions: "dashboard:view"

    },

    // {
    //   id: 3,
    //   label: 'Attendance Management',
    //   icon: '../../../assets/CalendarBlank.png',
    //   selected_icon: '../../../assets/CalendarBlank.png',
    //   selected: false,
    //   // router_link: '/attendance/list',
    //   submenu: [
    //     { label: 'My Attendance', router_link: '/my-attendances' },
    //     { label: 'Student Attendance', router_link: '/attendance/list' },
    //   ],
    //   permissions: "attendance:view"
    // },

    // ---Project head Learning Management---
    {
      id: 4,
      label: 'Learning Management',
      icon: '../../../assets/CalendarBlank.png',
      selected_icon: '../../../assets/CalendarBlank.png',
      selected: true,
      router_link: '/master/course/list',
      submenu: [],
      permissions: 'course:view'
    },

    // ---Instructor Learning Management---
    {
      id: 5,
      label: 'Learning Management',
      icon: '../../../assets/CalendarBlank.png',
      selected_icon: '../../../assets/CalendarBlank.png',
      selected: false,
      router_link: 'courses/list',
      submenu: [],
      permissions: "courses:view"
    },

    // ---Activity Management---
    {
      id: 6,
      label: 'Activity Management',
      icon: '../../../assets/CalendarBlank.png',
      selected_icon: '../../../assets/CalendarBlank.png',
      selected: false,
      router_link: '/ground-activity/list',
      submenu: [],
      permissions: "activity-management:view"
    },

    

    // ---Data  Managemnt---
    // {
    //   id: 8,
    //   label: 'Data  Managemnt',
    //   icon: '../../../assets/CalendarBlank.png',
    //   selected_icon: '../../../assets/CalendarBlank.png',
    //   selected: false,
    //   // router_link: '/attendance/list',
    //   submenu: [
    //     { label: 'Student Management', router_link: '/student-profile' },
    //     { label: 'UDISE form', router_link: '/udise-form' },
    //   ],
    //   permissions: "student-profile:view"

    // },

    // {
    //   id: 3,
    //   label: 'Student Profile',
    //   icon: '../../../assets/CalendarBlank.png',
    //   selected_icon: '../../../assets/CalendarBlank.png',
    //   selected: false,
    //   router_link: '/student-profile',
    //   submenu: [],
    //   permissions: "student-profile:view"

    // },



    // {
    //   id: 6,
    //   label: 'UDISE Form',
    //   icon: '../../../assets/page.svg',
    //   selected_icon: '../../../assets/udise-form-blue.svg',
    //   selected: false,
    //   router_link: '/udise-form',
    //   submenu: [],
    //   permissions: "udise:view"
    // },

   
  
   
  ]

}
