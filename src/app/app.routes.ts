import { Routes } from '@angular/router';
import { OrganizerGuard } from './core/guards/organizer.guard';
import { WorkerGuard } from './core/guards/worker.guard';

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
    }
];
