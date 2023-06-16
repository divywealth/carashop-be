import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailNotificationService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }
  async sendNotification(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      console.log(`Email successfully dispatched to ${mail.to}`);
      return transport;
    } catch (error) {
      throw error;
    }
  }
}
