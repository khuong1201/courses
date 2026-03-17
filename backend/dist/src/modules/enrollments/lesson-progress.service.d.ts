import { PrismaService } from '../../database/prisma.service';
export declare class LessonProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    markLessonCompleted(enrollmentId: string, studentId: string, lessonId: string): Promise<{
        success: boolean;
    }>;
}
