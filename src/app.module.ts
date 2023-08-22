import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [PessoaModule],
})
export class AppModule {}
