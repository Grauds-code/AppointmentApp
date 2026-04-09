export interface AppointmentModel {
  id?: number;
  AppointmentName: string;
  AppointmentDate: string;
  AppointmentTime: string;
  AppointmentLocation: string;
  MaxNumberofPeople: number;
  CurrentNumberofPeople: number;
  Description: string;
  Registered: boolean;
}

export interface AllAppointmentsModel {
  appointments: AppointmentModel[];
}
