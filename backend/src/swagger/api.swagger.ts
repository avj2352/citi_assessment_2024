import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { HealthModule } from "../health/health.module";
import { getServerVersion, getServerName } from "../util/config.util";
import { TaskModule } from "src/tasks/task.module";

const API_VERSION = getServerVersion();
const SERVER_NAME = getServerName();

export function apiDocumentation(app: INestApplication): void {
  // define api
  const healthAPI = new DocumentBuilder()
    .setTitle(`Health check for ${SERVER_NAME}`)
    .setDescription(
      `contains simple API to check if the server - ${SERVER_NAME} is up & running!`
    )
    .setVersion(API_VERSION)
    .addTag("Health")
    .build();

  // define api
  const taskAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Tasks in ${SERVER_NAME}`)
    .setDescription(
      `Task Module contains API to CRUD tasks under ${SERVER_NAME}`
    )
    .setVersion(API_VERSION)
    .addTag("Tasks")
    .build();

  // bind view
  const document01 = SwaggerModule.createDocument(app, healthAPI, {
    include: [HealthModule],
  });
  const document02 = SwaggerModule.createDocument(app, taskAPI, {
    include: [TaskModule],
  });

  // bind route
  SwaggerModule.setup("swagger/api/health", app, document01);
  SwaggerModule.setup("swagger/api/tasks", app, document02);
}
