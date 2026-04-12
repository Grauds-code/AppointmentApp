import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Navigation } from '../navigation/navigation';
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

  activeFilter = signal<'all' | 'available' | 'mine'>('all');

  filteredAppointments = computed(() => {
    const appointments = this.appointmentCreatorSignal().appointments;
    const filter = this.activeFilter();
    if (filter === 'available') {
      return appointments.filter((a) => a.CurrentNumberofPeople < a.MaxNumberofPeople);
    }
    if (filter === 'mine') {
      return appointments.filter((a) => a.Registered === true);
    }
    return appointments;
  });

  appointmentService = inject(AppointmentService);

  email: string = sessionStorage.getItem('userData') ?? '';
  isAdmin: boolean = this.email === 'admin@admin.lv';

  findAllAppointments() {
    this.appointmentService.findAllAppointments(this.email).subscribe({
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

  registerForAppointment(id: number | undefined) {
    if (id == null) return;
    this.appointmentService.registerForAppointment(id, this.email).subscribe({
      next: () => this.findAllAppointments(),
      error: (error) => console.error('Error registering:', error),
    });
  }

  cancelRegistration(id: number | undefined) {
    if (id == null) return;
    this.appointmentService.cancelRegistration(id, this.email).subscribe({
      next: () => this.findAllAppointments(),
      error: (error) => console.error('Error cancelling registration:', error),
    });
  }

  deleteAppointment(id: number | undefined) {
    if (id == null) return;
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => this.findAllAppointments(),
      error: (error) => console.error('Error deleting appointment:', error),
    });
  }
}
