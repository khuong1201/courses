import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
export declare class ModulesController {
    private readonly modulesService;
    constructor(modulesService: ModulesService);
    createModule(req: any, courseId: string, createModuleDto: CreateModuleDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
    updateModule(req: any, moduleId: string, title: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
    deleteModule(req: any, moduleId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        course_id: string;
        order: number;
    }>;
}
