import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationLog } from './schemas/notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let mockNotificationLogModel: any;

  beforeEach(async () => {
    mockNotificationLogModel = {
      create: jest.fn(),
      find: jest.fn(),
      aggregate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getModelToken(NotificationLog.name),
          useValue: mockNotificationLogModel,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      sentAt: expect.any(Date),
      metadata: { content: sendNotificationDto.content },
    };

    jest.spyOn(mockNotificationLogModel, 'create').mockResolvedValue(mockNotificationLog);

    const result = await service.sendNotification(sendNotificationDto);
    expect(result).toEqual(mockNotificationLog);
    expect(mockNotificationLogModel.create).toHaveBeenCalledWith(mockNotificationLog);
  });
});

  describe('getUserLogs', () => {
    it('should get user logs', async () => {
      const userId = 'user123';
      const mockLogs = [{ userId, type: 'marketing' }, { userId, type: 'newsletter' }];

      jest.spyOn(mockNotificationLogModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockLogs),
      });

      const result = await service.getUserLogs(userId);
      expect(result).toEqual(mockLogs);
      expect(mockNotificationLogModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  describe('getStats', () => {
    it('should get notification stats', async () => {
      const mockStats = [
        { _id: 'marketing', count: 5 },
        { _id: 'newsletter', count: 3 },
      ];

      jest.spyOn(mockNotificationLogModel, 'aggregate').mockResolvedValue(mockStats);

      const result = await service.getStats();
      expect(result).toEqual(mockStats);
      expect(mockNotificationLogModel.aggregate).toHaveBeenCalled();
    });
  });
});