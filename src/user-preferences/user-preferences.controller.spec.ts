import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';

describe('UserPreferencesController', () => {
  let controller: UserPreferencesController;
  let service: UserPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPreferencesController],
      providers: [
        {
          provide: UserPreferencesService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserPreferencesController>(UserPreferencesController);
    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create user preferences', async () => {
      const createDto: CreateUserPreferenceDto = {
        userId: 'user123',
        email: 'user@example.com',
        preferences: {
          marketing: true,
          newsletter: false,
          updates: true,
          frequency: 'weekly',
          channels: {
            email: true,
            sms: false,
            push: true,
          },
        },
        timezone: 'America/New_York',
      };

      jest.spyOn(service, 'create').mockResolvedValue(createDto as any);

      const result = await controller.create(createDto);
      expect(result).toEqual(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('should get user preferences', async () => {
      const userId = 'user123';
      const mockPreferences = { userId, preferences: {} };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockPreferences as any);

      const result = await controller.findOne(userId);
      expect(result).toEqual(mockPreferences);
      expect(service.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
  it('should update user preferences', async () => {
    const userId = 'user123';
    const updateDto: Partial<CreateUserPreferenceDto> = {
      preferences: {
        marketing: false,
        newsletter: true,
        updates: true,
        frequency: 'daily',
        channels: {
          email: true,
          sms: false,
          push: true
        }
      }
    };
    const mockUpdatedPreferences = { userId, ...updateDto };
    jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedPreferences as any);

    const result = await controller.update(userId, updateDto);
    expect(result).toEqual(mockUpdatedPreferences);
    expect(service.update).toHaveBeenCalledWith(userId, updateDto);
  });
});

  describe('remove', () => {
    it('should remove user preferences', async () => {
      const userId = 'user123';
      const mockRemovedPreferences = { userId, preferences: {} };
      jest.spyOn(service, 'remove').mockResolvedValue(mockRemovedPreferences as any);

      const result = await controller.remove(userId);
      expect(result).toEqual(mockRemovedPreferences);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});