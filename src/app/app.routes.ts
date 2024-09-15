import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyTypeComponent } from './pages/property-type/property-type.component';
import { SiteComponent } from './pages/site/site.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    }, 
    {
        path: '',
        component:LayoutComponent,
        children: [
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'property-type',
                component:PropertyTypeComponent
            },
            {
                path:'site-master',
                component:SiteComponent
            },
            {
                path:'Booking',
                component:BookingComponent,
                title:'Booking'
            }
        ]
    }

];
