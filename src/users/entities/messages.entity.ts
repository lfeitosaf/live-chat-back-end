import { randomUUID } from "crypto";

export class Messages {
    readonly id: string;
    content: string;
    readonly user_id: string;

    constructor(){
        this.id = randomUUID()
    }
}