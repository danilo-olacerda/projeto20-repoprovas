import prisma from '../db/db';

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