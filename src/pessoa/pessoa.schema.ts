import * as mongoose from 'mongoose';

export const PessoaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.UUID,
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

PessoaSchema.index({ nome: 'text', apelido: 'text', stack: 'text' });
PessoaSchema.index({
  nome: 'ascending',
  apelido: 'ascending',
  stack: 'ascending',
});
