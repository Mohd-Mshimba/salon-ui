export interface AppointmentResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Appointment];
}

export interface Appointment {
  id?: number;
  status: string;
  description:string;
  appointmentName:string;
  appointmentDate: string,
  customer: {
    id: number;
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    phoneNumber: string,
    street: string,
    city: string,
    state: string,
    status: number;
    zipCode: string,
    gender: string
  }
}
