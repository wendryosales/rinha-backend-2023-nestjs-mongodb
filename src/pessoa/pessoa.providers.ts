import { Connection } from 'mongoose';
import { PessoaSchema } from './pessoa.schema';
import { CreatePersonConsumer } from './consumers/create-person.consumer';

export const pessoaProviders = [
  {
    provide: 'PESSOA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pessoa', PessoaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  CreatePersonConsumer,
];
