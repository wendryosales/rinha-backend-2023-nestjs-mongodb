import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { DatabaseModule } from 'src/database/database.module';
import { pessoaProviders } from './pessoa.providers';
import { PessoaController } from './pessoa.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'pessoa',
    }),
  ],
  controllers: [PessoaController],
  providers: [PessoaService, ...pessoaProviders],
})
export class PessoaModule {}
