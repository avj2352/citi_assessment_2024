import { Module } from "@nestjs/common";
import { HealthModule } from "../health/health.module";
import { TaskModule } from "../tasks/task.module";

@Module({
  imports: [HealthModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
