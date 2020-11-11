import { Aluno } from './aluno.schema';
import { AlunosService } from './alunos.service';
export declare class AlunosController {
    private readonly alunosService;
    constructor(alunosService: AlunosService);
    create(aluno: Aluno): unknown;
    readAll(): unknown;
    readByTia(params: any): unknown;
    readByCurso(params: any): unknown;
    update(params: any, aluno: Aluno): unknown;
    delete(params: any): unknown;
}
