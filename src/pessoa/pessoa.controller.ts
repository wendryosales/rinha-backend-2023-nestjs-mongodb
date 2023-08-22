import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UUID } from 'crypto';
import { PessoaService } from './pessoa.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post('/')
  createPerson(@Body() body: CreatePersonDto) {
    const { nome, apelido, nascimento } = body;
    if (!nome || !apelido || !nascimento) {
      throw new UnprocessableEntityException();
    }

    return this.pessoaService.createPerson(body);
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
