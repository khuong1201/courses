import { LessonType } from '@prisma/client';
export declare class CreateLessonDto {
    title: string;
    contentType: LessonType;
    videoUrl?: string;
    textContent?: string;
    order: number;
}
