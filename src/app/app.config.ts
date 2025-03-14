import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './core/store/app.reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthEffect } from './modules/auth/state/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideStore(reducers) ,provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }) , provideEffects() , provideAnimations() , provideHttpClient(withInterceptors([authInterceptor])) , provideEffects([AuthEffect]) ]
};
