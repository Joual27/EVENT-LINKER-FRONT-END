import { Routes } from '@angular/router';


export const organizerRoutes : Routes = [
    {
        path : "events",
        loadComponent : () => import("./pages/events-page/events-page.component").then(m => m.EventsPageComponent)
    }, 
    {
        path : "announcements" , 
        loadComponent : () => import("./pages/announcements-page/announcements-page.component").then(m => m.AnnouncementsPageComponent)
    },
    {
        path : "announcement/:id",
        loadComponent : () => import("./pages/announcement-detail/announcement-detail.component").then(m => m.AnnouncementDetailComponent)
    }
]