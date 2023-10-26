/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Card } from 'src/cards/entities/card.entity';
import { List } from 'src/lists/entities/list.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

export const db = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'd5s73zxx',
        database: 'testpur',
      });
      sequelize.addModels([User, List, Card, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
