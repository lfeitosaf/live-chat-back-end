import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(        
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validatedUser(userEmail: string, userPassword: string){
        const user = await this.userService.findByEmail(userEmail)
        if (user){
            const passwordMatch = await compare(userPassword, user.password)
            if(passwordMatch){
                return { email: user.email }
            }
        }
        return null
    }

    async login(email: string){
        const user = await this.userService.findByEmail(email)
        return{
            token: this.jwtService.sign({ email }, { subject: user.id })
        }
    }
}