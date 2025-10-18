export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | Date;
  lastLoginIP: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
