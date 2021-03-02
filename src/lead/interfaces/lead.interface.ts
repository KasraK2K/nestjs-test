export interface BulkInsertResponse {
  all: number;
  success: number;
  failds: number;
  reason: ErrorReason[];
}

export interface ErrorReason {
  name: string;
  family_name: string;
  email: string;
  cellphone: string;
  error: string;
}
