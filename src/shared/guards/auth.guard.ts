import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/modules/users/user.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private usersRepo: UserRepository,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const token = request.cookies?.auth?.access_token;

        if (!token) throw new UnauthorizedException('Not authenticated');

        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.usersRepo.findById(payload.sub);

            if (!user) throw new UnauthorizedException('User not found');

            request.user = user;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
