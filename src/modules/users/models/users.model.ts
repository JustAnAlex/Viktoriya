import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from '../../posts/models/posts.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  password: number;

  @HasMany(() => Post)
  posts: Post[];
}
