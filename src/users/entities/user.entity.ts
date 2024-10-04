import { Exclude } from "class-transformer";
import { randomUUID } from "node:crypto"

export class User {
    readonly id: string;
    username: string;
    avatar: string;
    email: string;

    @Exclude()
    password: string;

    constructor() {
        this.id = randomUUID();
    }
}
