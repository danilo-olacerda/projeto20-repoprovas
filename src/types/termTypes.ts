import { terms } from "@prisma/client";

export type ITermData = Omit<terms, 'id'>;