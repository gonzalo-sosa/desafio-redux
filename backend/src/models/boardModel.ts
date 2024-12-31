// modelos de los tableros (nombre, descripción, etc)

import { z } from 'zod';

export const boardSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
});

export type Board = z.infer<typeof boardSchema>;
