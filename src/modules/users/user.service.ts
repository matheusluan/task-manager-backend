import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "src/shared/dtos/user.dto";
@Injectable()
export class UserService {
    constructor(private readonly usersRepo: UserRepository) { }

    async findById(id: string) {
        return this.usersRepo.findById(id);
    }

    async countUsers() {
        return this.usersRepo.countUsers();
    }

    async update({ id, dto }: { id: string, dto: UpdateUserDto }) {
        const data = { ...dto };

        if (dto.password) {
            const hash = await bcrypt.hash(dto.password, 10);
            data.password = hash;
        }

        return this.usersRepo.update(id, data);
    }

    async delete({ id }: { id: string }) {
        this.usersRepo.delete(id);
        return

    }
}
