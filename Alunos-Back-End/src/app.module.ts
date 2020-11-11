import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://aluno:mackenzie@exemplo.nyase.mongodb.net/exemplo?retryWrites=true&w=majority'),
    AlunosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
