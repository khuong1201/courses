import { CourseStatus } from '@prisma/client';
export declare class CourseEntity {
    id: string;
    instructor_id: string;
    title: string;
    description: string | null;
    category: string | null;
    cover_image: string | null;
    status: CourseStatus;
    price: number;
    average_rating: number;
    created_at: Date;
    updated_at: Date;
}
