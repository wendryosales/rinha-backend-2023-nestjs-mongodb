import { Module } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    PessoaModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: 'redis',
        port: 6379,
      },
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
