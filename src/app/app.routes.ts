import { Routes } from '@angular/router';
import { OrganizerGuard } from './core/guards/organizer.guard';
import { WorkerGuard } from './core/guards/worker.guard';
import { ProfileGuard } from './core/guards/profile.guard';

export const routes: Routes = [
    {
        path : "",
        loadComponent : () => import("./modules/home/pages/home-page/home-page.component").then(m => m.HomePageComponent)
    },
    {
        path : "auth",
        loadComponent : () => import("./modules/auth/pages/auth-page/auth-page.component").then( m => m.AuthPageComponent),
        loadChildren : () => import("./modules/auth/auth.routes").then(m => m.authRoutes)
    },
    {
        path : "*",
        redirectTo : ""
    },
    {
        path : "organizer",
        loadComponent : () => import("./modules/organizer/layouts/organizer-layout/organizer-layout.component").then(m => m.OrganizerLayoutComponent),
        loadChildren : () => import("./modules/organizer/organizer.routes").then(m => m.organizerRoutes),
        canActivate : [OrganizerGuard]
    },
    {
        path : "worker" ,
        loadComponent : () => import('./modules/worker/layouts/worker-layout/worker-layout.component').then(m => m.WorkerLayoutComponent),
        loadChildren : () => import("./modules/worker/worker.routes").then(m => m.workerRoutes),
        canActivate : [WorkerGuard]
    },
    {
        path: 'profile/:userId',
        loadComponent : () => import('./shared/pages/profile-page/profile-page.component').then(m => m.ProfilePageComponent)
    },
    {
        path: 'profile',
        loadComponent : () => import('./shared/pages/profile-page/profile-page.component').then(m => m.ProfilePageComponent),
        canActivate : [ProfileGuard]
    },{
        path : "dms",
        loadComponent : () => import("./shared/pages/dms-page/dms-page.component").then(m => m.DmsPageComponent),
        canActivate : [ProfileGuard]
    }
];
