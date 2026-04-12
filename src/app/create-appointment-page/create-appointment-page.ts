import { Component, inject, OnInit, signal } from '@angular/core';
import { Navigation } from '../navigation/navigation';
import { ErrorValdiations } from '../error-valdiations/error-valdiations';
import { AppointmentService } from '../services/appointment-service';
import { AllAppointmentsModel } from '../models/apointmentModel';
import { applyEach, form, FormField, required, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-create-appointment-page',
  imports: [Navigation, ErrorValdiations, FormField],
  templateUrl: './create-appointment-page.html',
  styleUrl: './create-appointment-page.css',
})
export class CreateAppointmentPage implements OnInit {
  ngOnInit(): void {
    this.findAllAppointments();
  }

  appointmentService = inject(AppointmentService);

  email: string = sessionStorage.getItem('userData') ?? '';

  appointmentCreatorSignal = signal<AllAppointmentsModel>({
    appointments: [],
  });
  formCreator = form(this.appointmentCreatorSignal, (e) => {
    applyEach(e.appointments, (item) => {
      required(item.AppointmentName, { message: 'Appointment Name is required' });
      required(item.AppointmentDate, { message: 'Appointment Date is required' });
      validate(item.AppointmentDate, ({ value }) => {
        if (value() && value() < new Date().toISOString().split('T')[0]) {
          return { kind: 'pastDate', message: 'Appointment date cannot be in the past' };
        }
        return null;
      });
      required(item.AppointmentTime, { message: 'Appointment Time is required' });
      required(item.AppointmentLocation, { message: 'Appointment Location is required' });
      required(item.MaxNumberofPeople, { message: 'Max Number of People is required' });
      required(item.Description, { message: 'Description is required' });
    });
  });

  findAllAppointments() {
    this.appointmentService.findAllAppointments(this.email).subscribe({
      next: (r) => {
        this.appointmentCreatorSignal.set({
          appointments: [
            ...(r.body ?? []),
            {
              id: undefined,
              AppointmentName: '',
              AppointmentDate: '',
              AppointmentTime: '',
              AppointmentLocation: '',
              MaxNumberofPeople: 0,
              CurrentNumberofPeople: 0,
              Description: '',
              Registered: false,
            },
          ],
        });
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      },
    });
  }

  updateAppointment(index: number) {
    const appointment = this.appointmentCreatorSignal().appointments[index];
    if (appointment.id == null) return;
    this.appointmentService.updateAppointment(appointment.id, appointment).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Error updating appointment:', error);
      },
    });
  }

  createAppointment(index: number) {
    this.appointmentService
      .createAppointment(this.appointmentCreatorSignal().appointments[index])
      .subscribe({
        next: (r) => {
          if (r.status === 201) {
            this.appointmentCreatorSignal.update((b) => ({
              appointments: [
                ...b.appointments.map((appointment, i) =>
                  i === index ? { ...appointment, id: r.body ?? undefined } : appointment,
                ),
                {
                  id: undefined,
                  AppointmentName: '',
                  AppointmentDate: '',
                  AppointmentTime: '',
                  AppointmentLocation: '',
                  MaxNumberofPeople: 0,
                  CurrentNumberofPeople: 0,
                  Description: '',
                  Registered: false,
                },
              ],
            }));
          }
        },
        error: (error) => {
          console.error('Error creating Appointment:', error);
        },
      });
  }
}
