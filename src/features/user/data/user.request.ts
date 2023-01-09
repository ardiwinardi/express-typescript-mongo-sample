import { UsernameSchema } from '@/shared/schemas/user.schema';
import { z } from 'zod';

export const UserGetAllSchema = z.object({
  query: z.object({
    page: z.number().default(1)
  })
});

export const CreateUserSchema = z.object({
  body: z.object({
    username: UsernameSchema,
    name: z.string()
  })
});

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.string()
  }),
  body: z.object({
    name: z.string()
  })
});

export type UserGetAllRequest = z.infer<typeof UserGetAllSchema>['query'];
export type UserCreateRequest = z.infer<typeof CreateUserSchema>['body'];
export type UserUpdateRequest = z.infer<typeof UpdateUserSchema>['body'] &
  z.infer<typeof UpdateUserSchema>['params'];
