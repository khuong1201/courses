import { PrismaService } from '../../database/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}
