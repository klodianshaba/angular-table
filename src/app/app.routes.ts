import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'demo', loadComponent: () => import('./pages/demo/demo.component').then(m => m.DemoComponent) },
];
