// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> { // Retourne UserDocument
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> { // Retourne un tableau de UserDocument
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> { // Retourne UserDocument
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | undefined> { // Retourne UserDocument | undefined
    return this.userModel.findOne({ username }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> { // Retourne UserDocument | undefined
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> { // Retourne UserDocument
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<UserDocument> { // Retourne UserDocument
    return this.userModel.findByIdAndDelete(id).exec();
  }
}