import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {
            sendNotification: jest.fn(),
            getUserLogs: jest.fn(),
            getStats: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should send a notification', async () => {
      const sendNotificationDto: SendNotificationDto = {
        userId: 'user123',
        type: 'marketing',
        channel: 'email',
        content: {
          subject: 'Test Subject',
          body: 'Test Body',
        },
      };

      const mockNotificationLog = {
        ...sendNotificationDto,
        status: 'sent',
        sentAt: new Date(),
      };

      jest.spyOn(service, 'sendNotification').mockResolvedValue(mockNotificationLog as any);

      const result = await controller.sendNotification(sendNotificationDto);
      expect(result).toEqual(mockNotificationLog);
      expect(service.sendNotification).toHaveBeenCalledWith(sendNotificationDto);
    });
  });

  describe('getUserLogs', () => {
    it('should get user logs', async () => {
      const userId = 'user123';
      const mockLogs = [{ userId, type: 'marketing' }, { userId, type: 'newsletter' }];

      jest.spyOn(service, 'getUserLogs').mockResolvedValue(mockLogs as any);

      const result = await controller.getUserLogs(userId);
      expect(result).toEqual(mockLogs);
      expect(service.getUserLogs).toHaveBeenCalledWith(userId);
    });
  });

  describe('getStats', () => {
    it('should get notification stats', async () => {
      const mockStats = [
        { _id: 'marketing', count: 5 },
        { _id: 'newsletter', count: 3 },
      ];

      jest.spyOn(service, 'getStats').mockResolvedValue(mockStats);

      const result = await controller.getStats();
      expect(result).toEqual(mockStats);
      expect(service.getStats).toHaveBeenCalled();
    });
  });
});