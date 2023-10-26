import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ListsModule } from './lists/lists.module';
import { db } from './configs/db.config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    CardsModule,
    CommentsModule,
    ListsModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'secret key',
      signOptions: { expiresIn: '360s' },
    }),
  ],
  providers: [db[0]],
})
export class AppModule {}
