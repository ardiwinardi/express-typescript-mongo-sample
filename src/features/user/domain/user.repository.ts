import {
  UserCreateRequest,
  UserGetAllRequest,
  UserUpdateRequest
} from '../data/user.request';
import { User } from './user.entity';

export default interface UserRepository {
  getAll(request: UserGetAllRequest): Promise<User[]>;
  getById(userId: string): Promise<User>;
  create(request: UserCreateRequest): Promise<void>;
  update(request: UserUpdateRequest): Promise<void>;
  delete(userId: string): Promise<void>;
}
