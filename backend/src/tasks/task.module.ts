import { Module } from "@nestjs/common";
import { TaskController } from "./controllers/tasks.controller";

@Module({
  controllers: [TaskController],
})
export class TaskModule {}
