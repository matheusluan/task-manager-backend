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

        const authHeader = request.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException('Not authenticated');

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token format');

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
