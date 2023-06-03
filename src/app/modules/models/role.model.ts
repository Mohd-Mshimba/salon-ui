export interface RoleResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Role];
}

export interface Role {
  id?: number;
  roleName: string;
  description: string;
}

