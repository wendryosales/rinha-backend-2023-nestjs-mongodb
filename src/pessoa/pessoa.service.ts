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

    await this.cacheManager.set(body.apelido, '1', 0);
    await this.cacheManager.set(body.id, JSON.stringify(body), 0);
    await this.pessoaQueue.add('createPerson', body);
    return;
  }

  async getPersons(t: string) {
    const cached = await this.cacheManager.get(t);
    if (cached) {
      return JSON.parse(cached as string);
    }
    const persons = await this.pessoaModel
      .find({
        $or: [
          { nome: { $regex: t, $options: 'i' } },
          { apelido: { $regex: t, $options: 'i' } },
          { stack: t },
        ],
      })
      .limit(50)
      .exec();
    await this.cacheManager.set(t, JSON.stringify(persons), 0);
    return persons;
  }

  async getPerson(id: string) {
    const cached = await this.cacheManager.get(id);
    if (cached) {
      await this.cacheManager.del(id);
      return JSON.parse(cached as string);
    }
    const person = await this.pessoaModel.findOne({ _id: id }).exec();
    if (!person) {
      throw new NotFoundException();
    }
    await this.cacheManager.set(id, JSON.stringify(person));
    return person;
  }

  getCount() {
    return this.pessoaModel.countDocuments().exec();
  }
}
