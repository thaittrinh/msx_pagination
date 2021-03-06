import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [StudentsModule, MongooseModule.forRoot('mongodb+srv://admin:123@abc-kpizi.mongodb.net/test?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
