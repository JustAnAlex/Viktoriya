import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'should be string' })
  readonly title: string;

  @IsString({ message: 'should be string' })
  readonly content: string;

  @Min(1, { message: 'should be positive number, min 1' })
  readonly userId: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: '0 is min' })
  readonly rating?: number;
}
