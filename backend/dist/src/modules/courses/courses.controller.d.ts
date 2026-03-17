import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    findAllPublic(): import("@prisma/client").Prisma.PrismaPromise<({
        instructor: {
            profile: {
                full_name: string;
                avatar_url: string | null;
            } | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    })[]>;
    create(req: any, createCourseDto: CreateCourseDto): import("@prisma/client").Prisma.Prisma__CourseClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllMyCourses(req: any): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    }[]>;
    findOne(id: string): Promise<{
        modules: ({
            lessons: {
                id: string;
                created_at: Date;
                updated_at: Date;
                title: string;
                order: number;
                module_id: string;
                content_type: import("@prisma/client").$Enums.LessonType;
                video_url: string | null;
                text_content: string | null;
                duration: number | null;
            }[];
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            title: string;
            course_id: string;
            order: number;
        })[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    }>;
    update(req: any, id: string, updateCourseDto: UpdateCourseDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    }>;
    publish(req: any, id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string | null;
        category: string | null;
        cover_image: string | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        price: number | null;
        average_rating: number | null;
        instructor_id: string;
    }>;
}
