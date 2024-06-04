import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { COMMON_ERROR } from "src/common/enums";
import { TaskService } from "../services/tasks.service";
import { TaskParamIdDto, TaskPayloadDto } from "../dto/tasks.dto";

@Controller("tasks")
export class TaskController {
  private logger: Logger;
  constructor(private readonly taskService: TaskService) {
    this.logger = new Logger("TaskController");
  }

  @Get()
  @ApiOperation({
    description: "get all tasks",
  })
  async getAllTasks(): Promise<any> {
    this.logger.debug("Fetching all tasks");
    return await this.taskService.getAllTasks();
  }

  @Get("/:id")
  @ApiOperation({
    description: "get task record by id",
  })
  async getTaskByGroupId(
    @Param(ValidationPipe) param: TaskParamIdDto
  ): Promise<any> {
    try {
      const { id } = param;
      return this.taskService.getTaskById(id);
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({
    description: "create new task record.",
  })
  @UsePipes(ValidationPipe)
  async addNewTaskRecord(
    @Body() payloadDto: TaskPayloadDto
  ): Promise<{ message: string }> {
    this.logger.debug("create new task record");
    const { title, description, completed } = payloadDto;
    await this.taskService.addTaskRecord({
      title,
      description,
      completed,
    });
    return Promise.resolve({ message: "ok" });
  }

  @Put("/:id")
  @ApiOperation({
    description: "Update existing task record by id",
  })
  @UsePipes(ValidationPipe)
  async updateTaskById(
    @Param(ValidationPipe) param: TaskParamIdDto,
    @Body() payloadDto: TaskPayloadDto
  ): Promise<string> {
    const { title, description, completed } = payloadDto;
    const { id } = param;
    return await this.taskService.updateTaskById(id, {
      title,
      description,
      completed,
    });
  }

  @Delete("/delete/:id")
  @ApiOperation({
    description:
      "Delete existing song details by its id. *Requires Access Token",
  })
  async deleteTaskById(
    @Param(ValidationPipe) param: TaskParamIdDto
  ): Promise<{ message: string }> {
    const { id } = param;
    await this.taskService.deleteTaskById(id);
    return Promise.resolve({ message: "ok" });
  }
}
