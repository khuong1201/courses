import { PrismaService } from '../../database/prisma.service';
import { LessonType } from '@prisma/client';
export declare class LessonsService {
    private prisma;
    constructor(prisma: PrismaService);
    createLesson(moduleId: string, instructorId: string, data: {
        title: string;
        contentType: LessonType;
        videoUrl?: string;
        textContent?: string;
        order: number;
    }): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        order: number;
        content_type: import("@prisma/client").$Enums.LessonType;
        video_url: string | null;
        text_content: string | null;
        duration: number | null;
        module_id: string;
    }>;
}
