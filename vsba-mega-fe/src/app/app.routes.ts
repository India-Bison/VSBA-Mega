import { Routes } from '@angular/router';
import { DashboardLayoutPageComponent } from './pages/dashboard-layout-page/dashboard-layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
    // { path: 'sign-in', component: SignInPageComponent },

    {
        path: '', component: DashboardLayoutPageComponent,
        // canActivate: [canActivateAuthRole],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPageComponent },
         
            { path: '**', redirectTo: 'dashboard' },


        ]

    }
];
