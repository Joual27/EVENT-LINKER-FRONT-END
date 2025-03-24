import { Routes } from '@angular/router';


export const organizerRoutes : Routes = [
    {
        path : "events",
        loadComponent : () => import("./pages/events-page/events-page.component").then(m => m.EventsPageComponent)
    }
]