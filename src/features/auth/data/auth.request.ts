import { PasswordSchema, UsernameSchema } from '@/shared/schemas/user.schema';
import { z } from 'zod';

export const LoginSchema = z.object({
  body: z.object({
    username: UsernameSchema,
    password: PasswordSchema
  })
});

export const SignUpSchema = z
  .object({
    body: z.object({
      username: UsernameSchema,
      name: z.string(),
      password: PasswordSchema,
      passwordConfirmation: PasswordSchema
    })
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['body.passwordConfirmation']
  });

export const ChangePasswordSchema = z
  .object({
    body: z.object({
      oldPassword: z.string(),
      password: PasswordSchema,
      passwordConfirmation: PasswordSchema
    })
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['body.passwordConfirmation'] // path of error
  });

export const ForgotPasswordSchema = z.object({
  body: z.object({
    username: UsernameSchema
  })
});

export const ResetPasswordSchema = z
  .object({
    body: z.object({
      token: z.string(),
      username: UsernameSchema,
      password: PasswordSchema,
      passwordConfirmation: PasswordSchema
    })
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['body.passwordConfirmation']
  });

export type AuthLoginRequest = z.infer<typeof LoginSchema>['body'];
export type AuthSignUpRequest = z.infer<typeof SignUpSchema>['body'];
export type AuthChangePasswordRequest = z.infer<
  typeof ChangePasswordSchema
>['body'];
export type AuthForgotPasswordRequest = z.infer<
  typeof ForgotPasswordSchema
>['body'];
export type AuthResetPasswordRequest = z.infer<
  typeof ResetPasswordSchema
>['body'];
