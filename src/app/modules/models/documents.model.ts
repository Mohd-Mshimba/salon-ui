export interface DocumentsResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: [Documents];
}

export interface Documents {
  id?: number;
  documentFile: string;
  name: string;
  description: string;
}

