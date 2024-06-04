import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { HealthModule } from "../health/health.module";
import { SongsModule } from "../songs/songs.module";
import { getServerVersion, getServerName } from "../util/config.util";

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
  const authAPI = new DocumentBuilder()
    .setTitle(`Authentication flow of ${SERVER_NAME}`)
    .setDescription(
      `The Auth Module contains API requests for authentication & registration flow in ${SERVER_NAME}`
    )
    .setVersion(API_VERSION)
    .addTag("Auth")
    .build();

  // define api
  const groupAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Groups in ${SERVER_NAME}`)
    .setDescription(
      `Groups Module contains API to CRUD Groups / Categories under ${SERVER_NAME}`
    )
    .setVersion(API_VERSION)
    .addTag("Groups")
    .build();

  // define api
  const tagAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Tags in ${SERVER_NAME}`)
    .setDescription(
      `Groups Module contains API to CRUD Tags / Annotations under ${SERVER_NAME}`
    )
    .setVersion(API_VERSION)
    .addTag("Tags")
    .build();

  // define api
  const songAPI = new DocumentBuilder()
    .setTitle(`CRUD Operations on Songs in ${SERVER_NAME}`)
    .setDescription(
      `Groups Module contains API to CRUD Songs / Lyrics under ${SERVER_NAME}`
    )
    .setVersion(API_VERSION)
    .addTag("Songs")
    .build();

  // bind view
  const document01 = SwaggerModule.createDocument(app, healthAPI, {
    include: [HealthModule],
  });
  const document05 = SwaggerModule.createDocument(app, songAPI, {
    include: [SongsModule],
  });

  // bind route
  SwaggerModule.setup("swagger/api/health", app, document01);
  SwaggerModule.setup("swagger/api/songs", app, document05);
}
