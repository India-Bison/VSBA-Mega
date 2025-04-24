import { Routes } from '@angular/router';
import { DashboardLayoutPageComponent } from './pages/dashboard-layout-page/dashboard-layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    // { path: 'sign-in', component: SignInPageComponent },

    {
        path: '', component: DashboardLayoutPageComponent,
        // canActivate: [canActivateAuthRole],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'list', component: ListComponent },
            { path: 'project-list', component: ListComponent },

            { path: '**', redirectTo: 'dashboard' },


        ]

    }
];
