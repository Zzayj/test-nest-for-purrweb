import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { List } from 'src/lists/entities/list.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => List)
  list: List[];
}
