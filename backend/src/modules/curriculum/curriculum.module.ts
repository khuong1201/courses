import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';

@Module({
  controllers: [ModulesController, LessonsController],
  providers: [ModulesService, LessonsService],
})
export class CurriculumModule {}
