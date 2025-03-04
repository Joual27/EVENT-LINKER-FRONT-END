import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : "",
        loadComponent : () => import("./modules/home/pages/home-page/home-page.component").then(m => m.HomePageComponent)
    },
    {
        path : "auth",
        loadComponent : () => import("./modules/auth/pages/auth-page/auth-page.component").then(m => m.AuthPageComponent)
    }
];
