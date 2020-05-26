import {Controller,Get, Post, Body, Req} from '@nestjs/common';

import { StudentsService } from './students.service'
import { Student } from './student.model';


@Controller('students')
export class StudentsController {
    constructor(private readonly studentService : StudentsService){}
    
    //http://localhost:3000/students?page=1&size=10&sort=asc&sortName=age&code=PS&name=t&minAge=17&maxAge=20
    @Get()
    async getAllStudents(@Req() req){
        const students = this.studentService.getStudents(req.query);
        
        return students;
    }

    @Post()
    async insertStudent(@Body() student: Student){
        const result = await this.studentService.insertStudent(student);
        return result;
    }
}
