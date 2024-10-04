import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, AuthModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
