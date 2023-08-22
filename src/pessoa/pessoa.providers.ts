import { Connection } from 'mongoose';
import { PessoaSchema } from './pessoa.schema';

export const pessoaProviders = [
  {
    provide: 'PESSOA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pessoa', PessoaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
