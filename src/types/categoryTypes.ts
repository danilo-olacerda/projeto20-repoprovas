import { categories } from "@prisma/client";

export type ICategorieData = Omit<categories, 'id'>;