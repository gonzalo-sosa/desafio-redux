// modelo de las tarjeta dentro de las listas de los tableros de trabajo (título, descripción, etc)

import { z } from 'zod';

export const cardSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
});

export type Card = z.infer<typeof cardSchema>;
