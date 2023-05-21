import { IsOptional, IsString, Min } from 'class-validator';

export class GetAllUserPostsDto {
  @IsString({ message: 'should be string' })
  readonly email: string;

  @IsOptional()
  @Min(1, { message: 'should be positive number, min 1' })
  readonly page?: number;

  @IsOptional()
  @Min(1, { message: 'should be positive number, min 1' })
  readonly limit?: number;
}
