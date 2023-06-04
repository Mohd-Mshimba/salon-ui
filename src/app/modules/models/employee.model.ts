export interface EmployeeResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Employee];
}

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  city: string;
  gender: string;
  status: string;
  email: string;
  roles: {
    id?: number;
  };
}

