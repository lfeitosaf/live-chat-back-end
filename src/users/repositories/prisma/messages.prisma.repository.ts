import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { MessagesRepository } from '../messages.repository';
import { Messages } from 'src/users/entities/messages.entity';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@Injectable()
export class MessagesPrismaRepository implements MessagesRepository {
  constructor(private prisma: PrismaService) {}

  async create(user_id: string, data: CreateMessageDto) {
    const newMessage = await this.prisma.messages.create({
      data: {
        ...data,
        user: {
          connect: {
            id: user_id 
          }
        }
      }
    });
  
    return newMessage;
  }

  async getMessages(): Promise<Messages[]> {
    const messages = await this.prisma.messages.findMany();
    return plainToInstance(Messages, messages)
  }

  async findMessage(id: string): Promise<Messages> {
    const message = await this.prisma.user.findUnique({
      where: { id },
    });
    return plainToInstance(Messages, message);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
