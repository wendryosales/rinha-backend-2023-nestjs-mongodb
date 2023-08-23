import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Pessoa } from './pessoa.interface';
import { CreatePersonDto } from './dtos/create-person.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PessoaService {
  constructor(
    @InjectQueue('pessoa') private readonly pessoaQueue: Queue,
    @Inject('PESSOA_MODEL') private pessoaModel: Model<Pessoa>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createPerson(body: CreatePersonDto & { id: string }) {
    const apelidoCached = await this.cacheManager.get(body.apelido);
    if (apelidoCached) {
      throw new UnprocessableEntityException('Apelido já existe');
    }

    await this.cacheManager.set(body.apelido, '1');
    await this.pessoaQueue.add('createPerson', body);
    return;
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

  async getPerson(id: string) {
    // const cached = await this.cacheManager.get<string>(id);
    // if (!cached) {
    //   throw new NotFoundException();
    // }
    // return JSON.parse(cached);
    //
    const person = await this.pessoaModel.findById(id).exec();
    if (!person) {
      throw new NotFoundException();
    }
    return person;
  }

  getCount() {
    return this.pessoaModel.countDocuments().exec();
  }
}
