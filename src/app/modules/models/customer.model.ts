export interface CustomerResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Customer];
}

export interface Customer {
  id?: number;
  firstName: string;
  middleName:String;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  gender: string;
}
