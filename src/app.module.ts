import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PessoaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    CacheModule.register(),
  ],
})
export class AppModule {}
