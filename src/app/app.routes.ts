import { Routes } from '@angular/router';
import { Authentification } from './authentification/authentification';

export const routes: Routes = [
  { path: '', component: Authentification, title: 'Login/Register' },
  { path: '**', redirectTo: '' },
];
