import { Routes } from '@angular/router';
import { Authentification } from './authentification/authentification';
import { adminGuard } from './adminGuard/adminGuard';

export const routes: Routes = [
  { path: '', component: Authentification, title: 'Login/Register' },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./appointment-page/appointment-page').then((m) => m.AppointmentPage),
    title: 'Appointments',
  },
  {
    path: 'create-appointment-page',
    loadComponent: () =>
      import('./create-appointment-page/create-appointment-page').then(
        (m) => m.CreateAppointmentPage,
      ),
    title: 'Create Appointment',
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: '' },
];
