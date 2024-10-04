import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MessagesRepository } from 'src/users/repositories/messages.repository';
import { MessagesPrismaRepository } from 'src/users/repositories/prisma/messages.prisma.repository';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    PrismaService,
    {
      provide: MessagesRepository,
      useClass: MessagesPrismaRepository
    }
    ],
  exports:[MessagesService]
})
export class MessagesModule {}
