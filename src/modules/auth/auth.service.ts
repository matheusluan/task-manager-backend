import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/user.repository';
import { RegisterDto } from 'src/shared/dtos/register.dto';
import { LoginDto } from 'src/shared/dtos/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register({ email, password, name }: RegisterDto, res: Response) {
        const exists = await this.usersRepo.findByEmail(email);

        if (exists)
            throw new ConflictException('Email already in use');

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.usersRepo.create({
            name,
            email,
            password: passwordHash,
        });

        const token = this.generateToken(user.id, user.email);

        res.cookie('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day same time to live of the jwt
        });

        return { user: { name: user.name, email: user.email } };

    }

    async login({ email, password }: LoginDto, res: Response) {
        const user = await this.usersRepo.findByEmail(email);

        if (!user) throw new NotFoundException('User not found.');

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) throw new UnauthorizedException('Invalid credentials.');

        const token = this.generateToken(user.id, user.email);

        res.cookie('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day same time to live of the jwt
        });

        return { user: { name: user.name, email: user.email } };
    }

    private generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
