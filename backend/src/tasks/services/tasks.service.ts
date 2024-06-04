import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ITask, ITaskRequest } from "../models/tasks.model";
import { COMMON_ERROR } from "src/common/enums";
import { FileService } from "../dao/file.dao";

@Injectable()
export class TaskService {
  private logger: Logger;

  constructor(private fileService: FileService) {
    this.logger = new Logger("TaskService");
  }

  /**
   * Get all task records
   * @returns Promise<ITask[]>
   */
  async getAllTasks(): Promise<ITask[]> {
    this.logger.debug("fetching all task records");
    try {
      const record: ITask[] = await this.fileService.readJSON();
      return record;
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }

  /**
   * Get task by id
   * @returns Promise<ITask>
   */
  async getTaskById(id: string): Promise<ITask> {
    this.logger.debug(`fetching task by id ${id}`);
    try {
      const record: ITask[] = await this.fileService.readJSON();
      const filteredRecord: ITask[] = record.filter(
        (item: ITask) => item.id === id
      );
      if (filteredRecord.length > 0) {
        return filteredRecord[0];
      } else {
        throw new BadRequestException(COMMON_ERROR.NOT_FOUND);
      }
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }

  /**
   * Post new task record
   * @return Promise<any>
   */
  async addTaskRecord(payload: ITaskRequest): Promise<any> {
    const { title, description, completed } = payload;
    try {
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }
}
