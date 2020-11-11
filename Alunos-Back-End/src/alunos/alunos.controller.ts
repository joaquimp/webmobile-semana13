import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Aluno } from './aluno.schema';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunosService: AlunosService) {}

    //Create
    @Post()
    async create(@Body() aluno: Aluno) {
        const result = await this.alunosService.create(aluno);

        // if(!result) throw new BadRequestException();
        if(result == undefined) {
            // throw new BadRequestException();
            throw new HttpException('O TIA deve ser único e todos os parâmetros precisam ser informados', HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    //Read
    @Get()
    async readAll() {
        return await this.alunosService.readAll();
    }

    @Get('/:id')
    async readByTia(@Param() params) {
        const result = await this.alunosService.readByTia(params.id);

        if (result == undefined) {
            throw new NotFoundException();
        }

        return result;
    }

    @Get('/cursos/:id')
    async readByCurso(@Param() params) {
        return await this.alunosService.readByCurso(params.id);
    }

    //Update
    @Put('/:id')
    async update(@Param() params, @Body() aluno: Aluno) {
        const result = await this.alunosService.update(params.id, aluno);

        if(result == undefined) {
            throw new NotFoundException();
        }

        return result;
    }

    //Delete
    @Delete('/:id')
    async delete(@Param() params) {
        const result = await this.alunosService.delete(params.id);

        if (result == undefined) {
            throw new NotFoundException();
        }

        return result;
    }
}
