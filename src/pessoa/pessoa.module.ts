import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from './pessoa.providers';
import { PessoaController } from './pessoa.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PessoaController],
  providers: [PessoaService, ...pessoaProviders],
})
export class PessoaModule {}
