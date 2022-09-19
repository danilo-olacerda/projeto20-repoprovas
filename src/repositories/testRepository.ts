import prisma from '../db/db';
import { ITestsData } from '../types/testTypes';

export async function newTest(name: string, pdfUrl: string, teacherDisciplineId: number, categoryId: number) {
    return await prisma.tests.create({
        data: {
            name,
            pdfUrl,
            teacherDisciplineId,
            categoryId
        }
    });
}

export async function getTestsByDisciplines() {

    return await prisma.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            teacher: {
                                select: {
                                    name: true
                                }
                            },
                            tests: {
                                distinct: ['categoryId'],
                                select: {
                                    category: {
                                        select: {
                                            id: true,
                                            name: true,
                                            tests: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                }
                                            }
                                        }
                                    }
                                },
                                orderBy: [
                                    {
                                        category: {
                                            name: 'asc'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    });

}

export async function getTestsByTeachers() {


    return await prisma.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    tests: {
                        distinct: ['categoryId'],
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                    tests: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    discipline: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })
    
}

export async function getTestInfo(test: ITestsData){

    const teacher = await prisma.teachersDisciplines.findUnique({
        where: {
            id: test.teacherDisciplineId
        },
        select: {
            teacher: {
                select: {
                    name: true
                }
            }
        }
    });
    
    const discipline = await prisma.teachersDisciplines.findUnique({
        where: {
            id: test.teacherDisciplineId
        },
        select: {
            discipline: {
                select: {
                    name: true
                }
            }
        }
    });

    const term = await prisma.teachersDisciplines.findUnique({
        where: {
            id: test.teacherDisciplineId
        },
        select: {
            discipline: {
                select: {
                    term: {
                        select: {
                            number: true
                        }
                    }
                }
            }
        }
    });

    return {
        teacher: teacher?.teacher.name,
        discipline: discipline?.discipline.name,
        term: term?.discipline.term.number
    }

}