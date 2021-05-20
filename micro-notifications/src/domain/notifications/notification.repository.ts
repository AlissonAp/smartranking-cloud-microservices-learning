export interface NotificationRepository {
  sendMail(to: string, subject: string, message : string): Promise<void>
}