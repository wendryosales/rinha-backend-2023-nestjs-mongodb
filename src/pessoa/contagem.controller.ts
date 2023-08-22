import { Controller, Get } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('contagem-pessoas')
export class CountController {
  constructor(private readonly pessoaService: PessoaService) {}
  @Get('/')
  getCount() {
    return this.pessoaService.getCount();
  }
}
