import { EnrollmentsService } from './enrollments.service';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(req: any, courseId: string): Promise<{
        id: string;
        updated_at: Date;
        progress_percentage: number;
        enrolled_at: Date;
        course_id: string;
        student_id: string;
    }>;
    getMyEnrollments(req: any): Promise<({
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
