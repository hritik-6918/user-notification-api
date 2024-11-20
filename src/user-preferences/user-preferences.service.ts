import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createUserPreferenceDto: CreateUserPreferenceDto): Promise<UserPreference> {
    const createdUserPreference = new this.userPreferenceModel(createUserPreferenceDto);
    return createdUserPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    return this.userPreferenceModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateUserPreferenceDto: Partial<CreateUserPreferenceDto>): Promise<UserPreference> {
    return this.userPreferenceModel.findOneAndUpdate({ userId }, updateUserPreferenceDto, { new: true }).exec();
  }

  async remove(userId: string): Promise<UserPreference> {
    return this.userPreferenceModel.findOneAndDelete({ userId }).exec();
  }
}