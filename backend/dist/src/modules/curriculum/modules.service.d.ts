import { PrismaService } from '../../database/prisma.service';
export declare class ModulesService {
    private prisma;
    constructor(prisma: PrismaService);
    createModule(courseId: string, instructorId: string, title: string, order: number): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
    private verifyModuleOwnership;
    updateModule(moduleId: string, instructorId: string, title: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
    deleteModule(moduleId: string, instructorId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
}
