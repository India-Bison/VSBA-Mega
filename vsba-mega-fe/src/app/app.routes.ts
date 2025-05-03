import { Routes } from '@angular/router';
import { DashboardLayoutPageComponent } from './pages/dashboard-layout-page/dashboard-layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProjectFormPageComponent } from './pages/project-form-page/project-form-page.component';
import { ListComponent } from './components/list/list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
    // { path: 'sign-in', component: SignInPageComponent },

    {
        path: '', component: DashboardLayoutPageComponent,
        // canActivate: [canActivateAuthRole],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'project/form', component: ProjectFormPageComponent },
            { path: 'list', component: ListComponent },
            { path: 'project/list', component: ProjectListComponent },
            { path: 'app-pagination', component: PaginationComponent },
            { path: 'user/list', component: UserListComponent },
            { path: '**', redirectTo: 'dashboard' },

        ]

    }
];
