import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ChannelsDto {
  @IsNotEmpty()
  email: boolean;

  @IsNotEmpty()
  sms: boolean;

  @IsNotEmpty()
  push: boolean;
}

class PreferencesDto {
  @IsNotEmpty()
  marketing: boolean;

  @IsNotEmpty()
  newsletter: boolean;

  @IsNotEmpty()
  updates: boolean;

  @IsNotEmpty()
  @IsString()
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @ValidateNested()
  @Type(() => ChannelsDto)
  channels: ChannelsDto;
}

export class CreateUserPreferenceDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @IsNotEmpty()
  @IsString()
  timezone: string;
}