import { z } from 'zod';

export const UsernameSchema = z.string().min(4).max(20);
export const PasswordSchema = z
  .string()
  .min(8)
  .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Must be contain uppercase, lowercase and number'
  });
