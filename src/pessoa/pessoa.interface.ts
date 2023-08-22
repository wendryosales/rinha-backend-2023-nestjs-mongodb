import * as mongoose from 'mongoose';

export interface Pessoa extends mongoose.Document {
  readonly id: string;
  readonly nome: string;
  readonly apelido: string;
  readonly nascimento: string;
  readonly stack: Array<string>;
}
