import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { Messages } from "../entities/messages.entity";

export abstract class MessagesRepository{
    abstract create(user_id: string, data: CreateMessageDto): Promise<Messages> | Messages
    abstract findMessage(id: string): Promise<Messages> | []
    abstract getMessages(): Promise<Messages[]> | Messages;
    abstract delete(id: string): Promise<void> | void;
}