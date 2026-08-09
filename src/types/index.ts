export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type UserRole = "ADMIN" | "SUPER_ADMIN";

export type ContentType = "TEXT" | "JSON" | "HTML";

export type ChatStatus = "OPEN" | "CLOSED";

export type MessageRole = "VISITOR" | "ADMIN";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface DashboardStats {
  orders: number;
  products: number;
  posts: number;
  videos: number;
  visitors: number;
  openChats: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
