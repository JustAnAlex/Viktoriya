import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'should be string' })
  @IsEmail({}, { message: 'should have example@m.ru view' })
  readonly email: string;

  @IsNotEmpty()
  @IsString({ message: 'should be string' })
  @Length(4, 12, { message: 'not less 4 and mot more 12' })
  readonly password: string;
}
