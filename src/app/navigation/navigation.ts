import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  router = inject(Router);
  adminGuard: boolean = sessionStorage.getItem('userData') === 'admin@admin.lv';

  loadAppointmentCreator() {
    this.router.navigateByUrl('/create-appointment-page');
  }
}
