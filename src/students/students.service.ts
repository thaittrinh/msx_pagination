import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student} from './student.model';
import { StudentReq} from './request/student.request';

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('Student') private readonly studentModel: Model<Student>,){}

        /**
         * Tìm kiếm, phân trang, sort.
         * find() : không phân biệt hoa thường(<$options:"$i">), tuổi trong khoảng minAge đến maxAge.
         * sort() : default desc.
         */
    async getStudents(studentReq: StudentReq){ 
        if(studentReq.page < 1) studentReq.page = 1;
        
        if(!studentReq.code) studentReq.code = '';// request ko có "code"
        if(!studentReq.name) studentReq.name = '';

        //if(!studentReq.minAge) studentReq.minAge = 0; 
        //if(!studentReq.maxAge) studentReq.maxAge = 100;

        const students = await this.studentModel.find({         
                                                    'code': { $regex: `.*${studentReq.code}.*`,$options:"$i"},
                                                    'name': { $regex: `.*${studentReq.name}.*`,$options:"$i"},
                                                    'age': { $gte: studentReq.minAge, $lte: studentReq.maxAge},                                                                                                                    
                                                }) 
                                                .skip(Number((studentReq.page -1)*studentReq.size))
                                                .limit(Number(studentReq.size))                                                                           
                                                .sort({[studentReq.sortName]: studentReq.sort === 'asc'? -1 : 1})
                                                .exec();
        return students.map(student => ({
            id : student.id,
            code : student.code,
            name : student.name,
            age : student.age,
            gender : student.gender,
        }));
    }

    async insertStudent(student: Student){
        const newStudent = new this.studentModel({
            code: student.code,
            name: student.name,
            age: student.age,
            gender: student.gender,
        });

        const result = await newStudent.save();
        return result;
    }


}
