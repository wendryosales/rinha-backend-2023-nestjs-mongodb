import * as mongoose from 'mongoose';

export const PessoaSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  nascimento: String,
  stack: Array,
});

PessoaSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});
