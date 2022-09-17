import { disciplines } from "@prisma/client";

export type IDisciplineData = Omit<disciplines, 'id'>;