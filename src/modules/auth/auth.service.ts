import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepo: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register(name: string, email: string, password: string) {
        const exists = await this.usersRepo.findByEmail(email);
        if (exists) {
            throw new ConflictException('Email already in use');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.usersRepo.create({
            name,
            email,
            password: passwordHash,
        });

        return this.generateToken(user.id, user.email);
    }

    async login(email: string, password: string) {
        const user = await this.usersRepo.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user.id, user.email);
    }

    private generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
