import { Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Pessoa } from './pessoa.interface';

@Injectable()
export class PessoaService {
  constructor(@Inject('PESSOA_MODEL') private pessoaModel: Model<Pessoa>) {}

  checkIfExists(apelido: string) {
    return this.pessoaModel
      .findOne({
        apelido: apelido,
      })
      .exec();
  }

  getPersons(t: string) {
    return this.pessoaModel
      .find({
        $or: [
          { nome: { $regex: t, $options: 'i' } },
          { apelido: { $regex: t, $options: 'i' } },
          { stack: { $regex: t, $options: 'i' } },
        ],
      })
      .limit(50)
      .exec();
  }

  getPerson(id: ObjectId) {
    return this.pessoaModel.findById(id).exec();
  }

  getCount() {
    return this.pessoaModel.countDocuments().exec();
  }
}
