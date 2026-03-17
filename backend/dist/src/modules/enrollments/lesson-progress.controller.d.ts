import { LessonProgressService } from './lesson-progress.service';
export declare class LessonProgressController {
    private readonly lessonProgressService;
    constructor(lessonProgressService: LessonProgressService);
    markLessonCompleted(req: any, enrollmentId: string, lessonId: string): Promise<{
        success: boolean;
    }>;
}
