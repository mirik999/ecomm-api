import {
  ConflictException,
  Injectable,
  InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { AuthReq } from '../auth/request/auth.req';
import { UserRes, UsersRes } from './response/user.res';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { UpdateUserReq } from './request/user.req';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userRepository: Model<UserDocument>,
  ) {}

  async getUserById(id: string): Promise<UserRes> {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      if (user.isDisabled) {
        throw new ConflictException('User is disabled');
      } else {
        return user;
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUsers(controls: GetElementsInput): Promise<UsersRes> {
    const { keyword, offset, limit } = controls;
    try {
      const users = await this.userRepository.aggregate([
        {
          $match: {
            $or: [{ email: { $regex: keyword, $options: 'i' } }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $facet: {
            stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
            stage2: [{ $skip: offset }, { $limit: limit }],
          },
        },
        {
          $unwind: '$stage1',
        },
        {
          $project: {
            count: '$stage1.count',
            payload: '$stage2',
          },
        },
      ]);

      return users[0];
    } catch (err) {
      console.log(err.message);
      throw new ConflictException();
    }
  }

  async updateUser(updatedUser: UpdateUserReq): Promise<UserRes> {
    try {
      const user = await this.userRepository.findOne({ id: updatedUser.id });
      for (const key in updatedUser) {
        if (updatedUser.hasOwnProperty(key)) {
          user[key] = updatedUser[key];
        }
      }
      return this.userRepository.create(user);
    } catch (err) {
      throw new ConflictException('Cant update user');
    }
  }

  async disableUsers(disabledUsers: GetByIdsInput): Promise<GetByIdsOutput> {
    try {
      await this.userRepository.updateMany(
        { id: { $in: disabledUsers.ids } },
        { $set: { isDisabled: true } },
      );
      return disabledUsers;
    } catch (err) {
      throw new ConflictException('Cant disable users');
    }
  }

  async activateUsers(activateUsers: GetByIdsInput): Promise<GetByIdsOutput> {
    try {
      await this.userRepository.updateMany(
        { id: { $in: activateUsers.ids } },
        { $set: { isDisabled: false } },
      );
      return activateUsers;
    } catch (err) {
      throw new ConflictException('Cant activate users');
    }
  }

  async deleteUsers(
    deleteUsers: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.userRepository.deleteMany(
        { id: { $in: deleteUsers.ids } }
      );
      return deleteUsers;
    } catch (err) {
      throw new ConflictException('Cant delete users');
    }
  }

  async createUser(newUser: AuthReq): Promise<User> {
    const isUserExists = await this.checkUser(newUser.email);
    if (isUserExists) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.id = uuid();
    user.email = newUser.email;
    user.salt = await bcrypt.genSalt();
    user.roles = ['guest'];
    user.createdAt = new Date().toString();
    user.isDisabled = false;
    user.password = await UserService.hashPassword(newUser.password, user.salt);

    try {
      return await this.userRepository.create(user);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async loginUser(newUser: AuthReq): Promise<User> {
    const user = await this.checkUser(newUser.email);
    if (user.isDisabled) {
      throw new ConflictException('User was disabled');
    }
    await UserService.isUserPasswordValid(user, newUser.password);
    return user;
  }

  async checkUser(email: string): Promise<UserDocument> {
    return this.userRepository.findOne({ email });
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  static async isUserPasswordValid(
    user: User,
    password: string,
  ): Promise<boolean> {
    if (user) {
      const isValid = await UserService.validatePassword(user, password);
      if (isValid) {
        return true;
      } else {
        throw new ConflictException('Wrong password');
      }
    } else {
      throw new ConflictException('Email does not exists');
    }
  }

  static async validatePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }

  async getCommentAuthor(id: string): Promise<UserRes> {
    try {
      return this.userRepository.findOne({ id })
    } catch (err) {
      throw new NotFoundException(`Could not find a user [Error] => ${err.message}`)
    }
  }
}
