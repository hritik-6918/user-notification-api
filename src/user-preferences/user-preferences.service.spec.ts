import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreference } from './schemas/user-preference.schema';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let mockUserPreferenceModel: any;

  beforeEach(async () => {
    mockUserPreferenceModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findOneAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferencesService,
        {
          provide: getModelToken(UserPreference.name),
          useValue: mockUserPreferenceModel,
        },
      ],
    }).compile();

    service = module.get<UserPreferencesService>(UserPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for each method in the service
});