import { teachers } from "@prisma/client";

export type ITeacherData = Omit<teachers, 'id'>;