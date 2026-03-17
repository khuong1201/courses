import { CreateCourseDto } from './create-course.dto';
declare const UpdateCourseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCourseDto>>;
export declare class UpdateCourseDto extends UpdateCourseDto_base {
    description?: string;
    cover_image?: string;
}
export {};
