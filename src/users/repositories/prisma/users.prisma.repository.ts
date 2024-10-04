import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { User } from "src/users/entities/user.entity";
import { UsersRepository } from "../users.repository"
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { plainToInstance } from "class-transformer"
import { v4 as uuidv4 } from 'uuid'

@Injectable()

export class UsersPrismaRepository implements UsersRepository{
    constructor(private prisma: PrismaService){}
    async create(data: CreateUserDto): Promise<User> {
        const user = new User()
        Object.assign(user, {
            ...data
        })

        const newUser = await this.prisma.user.create({
            data: {...user}
        })
        return plainToInstance(User, newUser)
    }
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany()

        return plainToInstance(User, users)
    }
    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({where:{id}})
        return plainToInstance(User, user)
    }
    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
        where: {id},
        data: {...data}
    })
        return plainToInstance(User, user)
    }
    async delete(id: string): Promise<void>{
        await this.prisma.user.delete({
            where: {id}
        })
    }
    async findByEmail(email: string): Promise<User>{
        const user = await this.prisma.user.findUnique(
            {where:{email}}
        )
        return user
    }

}