import { Min } from 'class-validator';

export class GetPostByIdDto {
  @Min(1, { message: 'should be positive number, min 1' })
  readonly id: number;
}
