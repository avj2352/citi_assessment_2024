import { Module } from "@nestjs/common";
import { TaskController } from "./controllers/tasks.controller";
import { TaskService } from "./services/tasks.service";
import { FileService } from "./dao/file.dao";

@Module({
  controllers: [TaskController],
  providers: [TaskService, FileService],
})
export class TaskModule {}
