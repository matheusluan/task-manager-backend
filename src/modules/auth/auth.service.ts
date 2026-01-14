import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/user.repository';
import { RegisterDto } from 'src/shared/dtos/register.dto';
import { LoginDto } from 'src/shared/dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register({ email, password, name }: RegisterDto) {
        const exists = await this.usersRepo.findByEmail(email);
        if (exists) throw new ConflictException('Email already in use');

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.usersRepo.create({
            name,
            email,
            password: passwordHash,
        });

        const token = this.generateToken(user.id, user.email);

        return {
            user: { name: user.name, email: user.email },
            ...token,
        };
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersRepo.findByEmail(email);
        if (!user) throw new NotFoundException('User not found.');

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) throw new UnauthorizedException('Invalid credentials.');

        const token = this.generateToken(user.id, user.email);

        return {
            user: { name: user.name, email: user.email },
            ...token,
        };
    }

    private generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };
        return { access_token: this.jwtService.sign(payload) };
    }
}
