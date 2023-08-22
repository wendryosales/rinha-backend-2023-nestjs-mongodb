import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Model } from 'mongoose';
import { UUID } from 'crypto';
import { Pessoa } from './pessoa.interface';

@Injectable()
export class PessoaService {
  constructor(@Inject('PESSOA_MODEL') private pessoaModel: Model<Pessoa>) {}

  createPerson(body: CreatePersonDto) {
    if (
      this.pessoaModel
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

  getPerson(id: UUID) {
    return this.pessoaModel.findById(id).exec();
  }

  getCount() {
    return this.pessoaModel.countDocuments().exec();
  }
}
