import { Request, Response } from 'express';
import * as testsService from '../services/testsService';
import { ITestsData } from '../types/testTypes';

export async function newTest(req: Request, res: Response) {

    const { name, pdfUrl, teacherDisciplineId, categoryId }: ITestsData = req.body;

    await testsService.newTest(name, pdfUrl, teacherDisciplineId, categoryId);

    res.sendStatus(201);
}

export async function getTestsByDisciplines(req: Request, res: Response) {
    
    const tests = await testsService.getTestsByDisciplines();
    
    res.send(tests);

}

export async function getTestsByTeachers(req: Request, res: Response) {
    
    const tests = await testsService.getTestsByTeachers();
    
    res.send(tests);

}

