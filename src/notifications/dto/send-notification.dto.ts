import { IsNotEmpty, IsString, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationContentDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(['marketing', 'newsletter', 'updates'])
  type: 'marketing' | 'newsletter' | 'updates';

  @IsNotEmpty()
  @IsEnum(['email', 'sms', 'push'])
  channel: 'email' | 'sms' | 'push';

  @ValidateNested()
  @Type(() => NotificationContentDto)
  content: NotificationContentDto;
}