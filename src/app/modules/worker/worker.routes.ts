import { Routes } from "@angular/router";


export const workerRoutes : Routes = [
    {
        path : "find-work",
        loadComponent : () => import("./pages/worker-announcements-page/worker-announcements-page.component").then(m => m.WorkerAnnouncementsPageComponent)
    }
]