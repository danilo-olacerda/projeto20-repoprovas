import { tests } from "@prisma/client";

export type ITestsData = Omit<tests, 'id'>;