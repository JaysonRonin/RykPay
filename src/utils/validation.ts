import { z } from 'zod';

export const transferSchema = z.object({
  recipient: z.string().min(3, 'Recipient name must be at least 3 characters').optional(),
  amount: z
    .number()
    .positive('Amount must be greater than 0')
    .min(1, 'Minimum transfer amount is $1')
    .optional(),
  note: z.string().max(100, 'Note must be under 100 characters').optional(),
});

// Type inference for validation schema
export type TransferData = z.infer<typeof transferSchema>;
