import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PessoaService } from './pessoa.service';
import { UUID, randomUUID } from 'crypto';
import { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('pessoas')
@UseInterceptors(CacheInterceptor)
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post('/')
  async createPerson(@Res() res: Response, @Body() body: CreatePersonDto) {
    const { nome, apelido, nascimento } = body;
    if (!nome || !apelido || !nascimento) {
      throw new UnprocessableEntityException();
    }

    const id = randomUUID();
    await this.pessoaService.createPerson({
      id,
      ...body,
    });

    res.set('Location', `/pessoas/${id}`);
    res.status(201).send();
  }

  @Get('/')
  getPersons(@Query('t') t: string) {
    if (!t) {
      throw new BadRequestException();
    }
    return this.pessoaService.getPersons(t);
  }

  @Get(':id')
  getPerson(@Param('id') id: UUID) {
    return this.pessoaService.getPerson(id);
  }
}
