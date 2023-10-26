import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'lists' })
export class List extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  @ForeignKey(() => User)
  owner_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @Column(DataType.STRING)
  description: string;

  @BelongsTo(() => User)
  user: User;
}
