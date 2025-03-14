import { Routes } from '@angular/router';


export const organizerRoutes : Routes = [
    {
        path: "profile",
        loadComponent : () => import('../../shared/pages/profile-page/profile-page.component').then(m => m.ProfilePageComponent)
    }
]