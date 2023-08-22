import { PessoaModule } from './pessoa/pessoa.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    PessoaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
