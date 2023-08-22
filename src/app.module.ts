import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PessoaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
