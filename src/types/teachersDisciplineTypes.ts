import { teachersDisciplines } from "@prisma/client";

export type ITeachersDisciplineData = Omit<teachersDisciplines, 'id'>;