import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesRepository } from 'src/users/repositories/messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { Messages } from 'src/users/entities/messages.entity';

@Injectable()
export class MessagesService {
    constructor(private messagesRepository: MessagesRepository) {}

    async create(user_id: string, createMessageDto: CreateMessageDto) {
        const message = await this.messagesRepository.create(user_id, createMessageDto);

        return message
    }

    async findMessage(id: string) {
        const findMessage = await this.messagesRepository.findMessage(id)
        if(!findMessage){
            throw new NotFoundException('Message not found.')
        }
      }


    async getAllMessages(){
        return this.messagesRepository.getMessages()
    }

    async deleteMessage(id: string){
        const findMessage = await this.messagesRepository.findMessage(id)
        if(!findMessage){
            throw new NotFoundException('Message not found.')
        }

        return this.messagesRepository.delete(id)
    }
}
