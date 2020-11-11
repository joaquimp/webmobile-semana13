import { Model } from 'mongoose';
import { Aluno, AlunoDocument } from './aluno.schema';
export declare class AlunosService {
    private alunoModel;
    constructor(alunoModel: Model<AlunoDocument>);
    create(aluno: Aluno): unknown;
    readAll(): unknown;
    readByTia(tia: string): unknown;
    readByCurso(curso: string): unknown;
    update(tia: string, aluno: Aluno): unknown;
    delete(tia: string): unknown;
}
