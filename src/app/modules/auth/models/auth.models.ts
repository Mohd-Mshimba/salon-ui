export interface AuthResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Auth];
}

export interface Auth {
  id?: number;
  username: string;
  password: string;
  roles: string;
}
