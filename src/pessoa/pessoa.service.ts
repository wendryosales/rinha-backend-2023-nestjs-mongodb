import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Pessoa } from './pessoa.interface';
import { CreatePersonDto } from './dtos/create-person.dto';

@Injectable()
export class PessoaService {
  constructor(@Inject('PESSOA_MODEL') private pessoaModel: Model<Pessoa>) {}

  async createPerson(body: CreatePersonDto & { id: string }) {
    if (
      await this.pessoaModel
        .findOne({
          apelido: body.apelido,
        })
        .exec()
    ) {
      throw new UnprocessableEntityException('Apelido já existe');
    }

    const createdPerson = new this.pessoaModel(body);

    return createdPerson.save();
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
