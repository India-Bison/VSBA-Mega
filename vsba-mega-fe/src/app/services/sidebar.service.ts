import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  sidebar: any = [
    {
      id: 1,
      label: 'Home',
      iconName: 'home',
      selected: false,
      router_link: '/dashboard-home',
      submenu: [],
      permissions: 'home:view'
    },
    {
      id: 2,
      label: 'Dashboard',
      iconName: 'dashboard',
      selected: false,
      router_link: '/dashboard',
      submenu: [],
      permissions: 'dashboard:view'
    },
    {
      id: 3,
      label: 'Attendance Management',
      iconName: 'attendance-file',
      selected: false,
      submenu: [
        { label: 'My Attendance', router_link: '/my-attendances' },
        { label: 'Student Attendance', router_link: '/attendance/list' }
      ],
      permissions: 'attendance:view'
    },
    {
      id: 4,
      label: 'Learning Management',
      iconName: 'course-icon',
      selected: true,
      router_link: '/master/course/list',
      submenu: [],
      permissions: 'course:view'
    },
    {
      id: 5,
      label: 'Learning Management',
      iconName: 'course-icon',
      selected: false,
      router_link: 'courses/list',
      submenu: [],
      permissions: 'courses:view'
    },
    {
      id: 6,
      label: 'Activity Management',
      iconName: 'ground-activity',
      selected: false,
      router_link: '/ground-activity/list',
      submenu: [],
      permissions: 'activity-management:view'
    },
    {
      id: 7,
      label: 'Document Management',
      iconName: 'Document-Repository',
      selected: false,
      router_link: '/document-repository',
      submenu: [],
      permissions: 'document-repo:view'
    },
    {
      id: 8,
      label: 'Data  Managemnt',
      iconName: 'student-profile',
      selected: false,
      submenu: [
        {
          label: 'Location',
          submenu: [
            { label: 'Country', router_link: '/master/country' },
            { label: 'State', router_link: '/master/state' },
            { label: 'Division', router_link: '/master/division' },
            { label: 'District', router_link: '/master/district' },
            { label: 'City', router_link: '/master/city' },
            { label: 'Block', router_link: '/master/block' }
          ]
        },
        {
          label: 'Content Master',
          submenu: [
            { label: 'Academic Team', router_link: '/master/academic-term' },
            { label: 'Subject', router_link: '/master/subject' },
            { label: 'Assessment Type', router_link: '/master/assessment-type' },
            { label: 'Activity Type', router_link: '/master/activity-type' }
          ]
        },
        {
          label: 'School Master',
          submenu: [
            { label: 'Udise/School/BRC', router_link: '/master/school' },
            { label: 'Grade', router_link: '/master/grade' },
            { label: 'Student', router_link: '/master/student' },
            { label: 'Document Type', router_link: '/master/document-type' }
          ]
        }
      ],
      permissions: 'student-profile:view'
    },
    {
      id: 9,
      label: 'Users Management',
      iconName: 'selected_files',
      selected: false,
      submenu: [
        {
          label: 'User',
          submenu: [
            { label: 'Instructor', router_link: '/users/instructor' },
            { label: 'MPSP', router_link: '/users/mpsp' },
            { label: 'Operations Head', router_link: '/users/operations-head' },
            { label: 'Project Head', router_link: '/users/project-head' },
            { label: 'Division Head', router_link: '/users/division-head' },
            { label: 'District Coordinator', router_link: '/users/district-coordinator' },
            { label: 'Block Coordinator', router_link: '/users/block-coordinator' }
          ]
        },
        {
          label: 'User Assignment',
          submenu: [
            { label: 'Instructor Assignment', router_link: '/user-assignment/instructor' }
          ]
        }
      ],
      permissions: 'user:view'
    },
    {
      id: 10,
      label: 'Users Management',
      iconName: 'selected_files',
      selected: false,
      submenu: [
        {
          label: 'User',
          submenu: [
            { label: 'Instructor', router_link: '/users/instructor' }
          ]
        }
      ],
      permissions: 'instructor-user-view:view'
    },
    {
      id: 11,
      label: 'Reports',
      iconName: 'selected_files',
      selected: false,
      submenu: [
        {
          label: 'Reports',
          submenu: [
            { label: 'Student Attendance', router_link: '/student-attendance-report' },
            { label: 'Student Attendance Summary', router_link: '/student-attendance-summary-report' },
            { label: 'Instructor Attendence', router_link: '/instructor-attendance-report' },
            { label: 'Instructor Attendence Summary', router_link: '/instructor-attendance-summary-report' },
            { label: 'Academic Activity', router_link: '/academic-activity-report' },
            { label: 'Non Academic Activity', router_link: '/non-academic-activity-report' },
            { label: 'User Assignment', router_link: '/user-assignment-report' },
            { label: 'Assessment Marks Wise ', router_link: '/assessment-report-marks-wise' },
            { label: 'Assessment Average Wise', router_link: '/assessment-report-average-wise' },
            { label: 'Course Progres Report', router_link: '/course-progres-report' }
          ]
        }
      ],
      permissions: 'reports:view'
    },
    {
      id: 12,
      label: 'Calendar',
      iconName: 'calendardots',
      selected: true,
      router_link: '/calendar/list',
      submenu: [],
      permissions: 'calender:view'
    },
    {
      id: 14,
      label: 'Leave Mangement',
      iconName: 'calendardots',
      selected: true,
      router_link: '/master/leave-management',
      submenu: [],
      permissions: 'leavemangment:view'
    }
  ];
  
}
