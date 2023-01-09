import App from '../app';
import UserRoute from '../features/user/presentation/user.route';

import {
  UserCreateRequest,
  UserUpdateRequest
} from './../features/user/data/user.request';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      const userRoute = new UserRoute();
      const users = userRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          username: 'a@username.com',
          password: await bcrypt.hash('q1w2e3r4!', 10)
        },
        {
          _id: 'alskdjfhg',
          username: 'b@username.com',
          password: await bcrypt.hash('a1s2d3f4!', 10)
        },
        {
          _id: 'zmxncbv',
          username: 'c@username.com',
          password: await bcrypt.hash('z1x2c3v4!', 10)
        }
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([userRoute]);
      return request(app.getServer()).get(`${userRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const userRoute = new UserRoute();
      const users = userRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        username: 'a@username.com',
        password: await bcrypt.hash('q1w2e3r4!', 10)
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userRoute]);
      return request(app.getServer())
        .get(`${userRoute.path}/${userId}`)
        .expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: UserCreateRequest = {
        username: 'test@username.com',
        name: 'test'
      };

      const userRoute = new UserRoute();
      const users = userRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: userData.username,
        name: userData.name
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userRoute]);
      return request(app.getServer())
        .post(`${userRoute.path}`)
        .send(userData)
        .expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: UserUpdateRequest = {
        name: 'test@username.com',
        id: userId
      };

      const userRoute = new UserRoute();
      const users = userRoute.usersController.userService.users;

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        name: userData.name
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userRoute]);
      return request(app.getServer())
        .put(`${userRoute.path}/${userId}`)
        .send(userData);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const userRoute = new UserRoute();
      const users = userRoute.usersController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        username: 'test@username.com',
        password: await bcrypt.hash('q1w2e3r4!', 10)
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([userRoute]);
      return request(app.getServer())
        .delete(`${userRoute.path}/${userId}`)
        .expect(200);
    });
  });
});
