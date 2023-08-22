import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from './pessoa.providers';
import { PessoaController } from './pessoa.controller';
import { CountController } from './contagem.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PessoaController, CountController],
  providers: [PessoaService, ...pessoaProviders],
})
export class PessoaModule {}
