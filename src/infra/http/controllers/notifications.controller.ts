import { GetRecipientNotifications } from './../../../app/use-cases/get-recipients-notifications';
import { ReadNotification } from './../../../app/use-cases/read-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotification } from './../../../app/use-cases/cancel-notification';

import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { UnreadNotification } from '@app/use-cases/unread-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotification: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private cancelNotification: CancelNotification,
    private sendNotification: SendNotification,
  ) {}

  @Get(':recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Get(':recipientId/count')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }
}
