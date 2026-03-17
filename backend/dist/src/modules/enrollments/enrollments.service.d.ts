import { PrismaService } from '../../database/prisma.service';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    enroll(studentId: string, courseId: string): Promise<{
        id: string;
        updated_at: Date;
        progress_percentage: number;
        enrolled_at: Date;
        course_id: string;
        student_id: string;
    }>;
    getMyEnrollments(studentId: string): Promise<({
        course: {
            title: string;
            cover_image: string | null;
            instructor: {
                profile: {
                    id: string;
                    created_at: Date;
                    updated_at: Date;
                    full_name: string;
                    avatar_url: string | null;
                    bio: string | null;
                    user_id: string;
                } | null;
            };
        };
    } & {
        id: string;
        updated_at: Date;
        progress_percentage: number;
        enrolled_at: Date;
        course_id: string;
        student_id: string;
    })[]>;
}
