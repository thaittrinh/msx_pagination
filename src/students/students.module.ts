import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import  {StudentSchema} from './student.model';

@Module({
    imports : [
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema}])
    ],
    controllers: [StudentsController],
    providers : [StudentsService]
})
export class StudentsModule {}
