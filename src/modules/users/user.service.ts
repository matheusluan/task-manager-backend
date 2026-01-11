import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private readonly usersRepo: UserRepository) { }

    async findById(id: string) {
        return this.usersRepo.findById(id);
    }

    async countUsers() {
        return this.usersRepo.countUsers();
    }
}
