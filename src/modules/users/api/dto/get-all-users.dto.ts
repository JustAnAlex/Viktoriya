import { IsOptional, Min } from 'class-validator';

export class GetAllUsersDto {
  @IsOptional()
  @Min(1, { message: 'should be positive number, min 1' })
  readonly page?: number;

  @IsOptional()
  @Min(1, { message: 'should be positive number, min 1' })
  readonly limit?: number;
}
