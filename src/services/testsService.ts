import * as testRepository from '../repositories/testRepository';

export async function newTest(name: string, pdfUrl: string, teacherDisciplineId: number, categoryId: number) {
    
    return await testRepository.newTest(name, pdfUrl, teacherDisciplineId, categoryId);

}

export async function getTestsByDisciplines() {

    return await testRepository.getTestsByDisciplines();

}

export async function getTestsByTeachers() {

    return await testRepository.getTestsByTeachers();

}