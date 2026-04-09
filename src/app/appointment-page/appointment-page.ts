import { Component, inject, OnInit, signal } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment-service';
import { AllAppointmentsModel } from '../models/apointmentModel';

@Component({
  selector: 'app-appointment-page',
  imports: [Navigation],
  templateUrl: './appointment-page.html',
  styleUrl: './appointment-page.css',
})
export class AppointmentPage implements OnInit {
  ngOnInit(): void {
    this.findAllAppointments();
  }
  appointmentCreatorSignal = signal<AllAppointmentsModel>({
    appointments: [],
  });

  inject = inject(Router);
  appointmentService = inject(AppointmentService);

  findAllAppointments() {
    this.appointmentService.findAllAppointments().subscribe({
      next: (r) => {
        this.appointmentCreatorSignal.set({
          appointments: r.body ?? [],
        });
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      },
    });
  }
}
