import { Controller, Get, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { getServerName, getServerVersion } from "../../util/config.util";

@Controller("")
export class HealthController {
  @Get("")
  @ApiOperation({
    description: `Display API is working and show swagger links`,
  })
  async displayHealth(@Res() res: Response) {
    res.json({
      name: getServerName(),
      version: getServerVersion(),
      health: "Good - OK",
      swaggerLinks: [
        { health: `/swagger/api/health` },
        { tasks: `/swagger/api/tasks` },
      ],
    });
  }
}
