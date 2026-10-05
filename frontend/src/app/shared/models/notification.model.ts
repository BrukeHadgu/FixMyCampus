export interface Notification {
  id: number | string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
