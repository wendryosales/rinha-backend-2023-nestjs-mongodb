import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Pessoa } from '../pessoa.interface';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';

@Processor('pessoa')
export class CreatePersonConsumer {
  constructor(@Inject('PESSOA_MODEL') private pessoaModel: Model<Pessoa>) {}

  @Process('createPerson')
  async createPerson(job: Job<Pessoa>) {
    const createdPerson = new this.pessoaModel(job.data);
    return createdPerson.save();
  }
}
