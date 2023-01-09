import { isEmpty } from '@/shared/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { hash } from 'bcrypt';
import { User } from '../domain/user.entity';
import UserRepository from '../domain/user.repository';
import userModel from './user.model';
import {
  UserCreateRequest,
  UserGetAllRequest,
  UserUpdateRequest
} from './user.request';

export default class UserRepositoryImpl implements UserRepository {
  public users = userModel;

  public async getAll(request: UserGetAllRequest): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async getById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async create(request: UserCreateRequest): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'user create request is empty');

    const findUser = await this.users.findOne<User>({
      username: request.username
    });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${request.username} already exists`
      );

    const hashedPassword = await hash('1234', 10);

    await this.users.create({
      ...request,
      password: hashedPassword
    });
  }

  public async update(request: UserUpdateRequest): Promise<void> {
    if (isEmpty(request))
      throw new HttpException(400, 'user update request is empty');

    const updateUserById = await this.users.findByIdAndUpdate<User>(
      request.id,
      {
        $set: {
          ...request
        }
      }
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");
  }

  public async delete(userId: string): Promise<void> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");
  }
}
