import { Routes } from "@angular/router";


export const authRoutes : Routes = [
    {
        path : "login",
        loadComponent : () => import("./components/login-form/login-form.component").then(m => m.LoginFormComponent)
    },
    {
        path : "register",
        loadComponent : () => import("./components/register-form/register-form.component").then(m => m.RegisterFormComponent)
    }
]