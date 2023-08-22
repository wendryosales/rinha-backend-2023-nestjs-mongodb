import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsOptional()
  @MaxLength(32)
  apelido: string | null;

  @IsString()
  @MaxLength(100)
  nome: string | null;

  @IsOptional()
  @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
  nascimento: string | null;

  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @IsOptional()
  stack: string[] | null;
}
