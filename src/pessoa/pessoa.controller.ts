import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnprocessableEntityException,
  Res,
} from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PessoaService } from './pessoa.service';
import { InjectQueue } from '@nestjs/bull';
import mongoose, { ObjectId } from 'mongoose';
import { Queue } from 'bull';
import { Response } from 'express';

@Controller('pessoas')
export class PessoaController {
  constructor(
    @InjectQueue('pessoa') private readonly pessoaQueue: Queue,
    private readonly pessoaService: PessoaService,
  ) {}

  @Post('/')
  async createPerson(@Res() res: Response, @Body() body: CreatePersonDto) {
    const { nome, apelido, nascimento } = body;
    if (!nome || !apelido || !nascimento) {
      throw new UnprocessableEntityException();
    }

    const apelidoExists = await this.pessoaService.checkIfExists(apelido);
    if (apelidoExists) {
      throw new UnprocessableEntityException('Apelido já existe');
    }
    const id = new mongoose.Types.ObjectId();
    this.pessoaQueue.add('createPerson', {
      id,
      ...body,
    });

    res.set('Location', `/pessoas/${id}`);
    res.status(201).send({
      message: 'Pessoa criada com sucesso',
    });
  }

  @Get('/')
  getPersons(@Query('t') t: string) {
    if (!t) {
      throw new BadRequestException();
    }
    return this.pessoaService.getPersons(t);
  }

  @Get(':id')
  async getPerson(@Param('id') id: ObjectId) {
    const person = await this.pessoaService.getPerson(id);
    if (!person) {
      throw new BadRequestException();
    }
    return person;
  }
}
