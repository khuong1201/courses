import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    createLesson(req: any, moduleId: string, createLessonDto: CreateLessonDto): Promise<{
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
