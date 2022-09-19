import sgMail from '@sendgrid/mail';
import * as userService from './userService';
import * as testsService from './testsService';
import dotenv from 'dotenv';
import { ITestsData } from '../types/testTypes';

dotenv.config();

sgMail.setApiKey(process.env.EMAIL_API_KEY as string);

console.log(process.env.EMAIL_API_KEY);

export async function sendNewTestEmail(test: ITestsData){

    const users = await userService.getAllUserEmail();
    const testInfo = await testsService.getTestInfo(test);

    const msg: {to: Array<{email: string}>, from: string, subject: string, text: string} = {
        to: users,
        from: 'dandam3006@gmail.com',
        subject: 'Prova(s) adicionada(s)',
        text: `A(s) seguinte(s) prova(s) foi/foram adicionada(s): ${testInfo.teacher} ${testInfo.term} - ${test.name} (${testInfo.discipline})`
    }

    await sgMail.send(msg);

}