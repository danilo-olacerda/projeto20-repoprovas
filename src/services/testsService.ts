import * as testRepository from '../repositories/testRepository';
import * as emailService from './emailService';
import { ITestsData } from '../types/testTypes';

export async function newTest(name: string, pdfUrl: string, teacherDisciplineId: number, categoryId: number) {
    
    const test = await testRepository.newTest(name, pdfUrl, teacherDisciplineId, categoryId);

    await emailService.sendNewTestEmail(test);

    return test;
}

export async function getTestsByDisciplines() {

    return await testRepository.getTestsByDisciplines();

}

export async function getTestsByTeachers() {

    return await testRepository.getTestsByTeachers();

}

export async function getTestInfo(test: ITestsData){

    return await testRepository.getTestInfo(test);

}