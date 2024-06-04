import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ITask, ITaskJSON, ITaskRequest } from "../models/tasks.model";
import { COMMON_ERROR } from "src/common/enums";
import { FileService } from "../dao/file.dao";
import { v4 } from "uuid";

@Injectable()
export class TaskService {
  private logger: Logger;

  constructor(private fileService: FileService) {
    this.logger = new Logger("TaskService");
  }

  private _parseJSONData(input: ITaskJSON): ITask {
    const { id, title, description, completed, createdDate, completedDate } =
      input;
    const new_createDate = new Date(createdDate);
    const new_completeDate =
      completedDate !== "" ? new Date(completedDate) : undefined;
    return {
      id,
      title,
      description,
      completed,
      createDate: new_createDate,
      completedDate: new_completeDate,
    };
  }

  private _writeJSONData(input: ITask): ITaskJSON {
    const { id, title, description, completed, createDate, completedDate } =
      input;
    const new_createDate = createDate.toISOString();
    const new_completeDate =
      completedDate !== undefined ? completedDate.toISOString() : "";
    return {
      id,
      title,
      description,
      completed,
      createdDate: new_createDate,
      completedDate: new_completeDate,
    };
  }

  /**
   * Get all task records
   * @returns Promise<ITask[]>
   */
  async getAllTasks(): Promise<ITask[]> {
    this.logger.debug("fetching all task records");
    try {
      const temp: ITaskJSON[] = await this.fileService.readJSON();
      const record: ITask[] = temp.map((item: ITaskJSON) =>
        this._parseJSONData(item)
      );
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
      const temp: ITaskJSON[] = await this.fileService.readJSON();
      const record: ITask[] = temp.map((item: ITaskJSON) =>
        this._parseJSONData(item)
      );
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
      this.logger.debug("add task record");
      const temp: ITaskJSON[] = await this.fileService.readJSON();
      const record: ITask[] = temp.map((item: ITaskJSON) =>
        this._parseJSONData(item)
      );
      record.push({
        id: v4(),
        title,
        description,
        completed,
        createDate: new Date(),
        completedDate: undefined,
      });
      const writeData = record.map((item: ITask) => this._writeJSONData(item));
      await this.fileService.writeJSON(writeData);
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }

  /**
   * update task record by id
   * @return Promise<any>
   */
  async updateTaskById(id: string, payload: ITaskRequest): Promise<any> {
    const { title, description, completed } = payload;
    try {
      this.logger.debug("update task record by id");
      const temp: ITaskJSON[] = await this.fileService.readJSON();
      const record: ITask[] = temp.map((item: ITaskJSON) =>
        this._parseJSONData(item)
      );
      const updatedRecord: ITask[] = record.map((item: ITask) => {
        if (item.id === id) {
          if (completed === true) item.completedDate = new Date();
          item = {
            ...item,
            id,
            title,
            description,
            completed,
          };
        }
        return item;
      });
      const writeData = updatedRecord.map((item: ITask) =>
        this._writeJSONData(item)
      );
      await this.fileService.writeJSON(writeData);
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }

  /**
   * update task record by id
   * @return Promise<any>
   */
  async deleteTaskById(id: string): Promise<any> {
    try {
      this.logger.debug("delete task record by id");
      const temp: ITaskJSON[] = await this.fileService.readJSON();
      const record: ITask[] = temp.map((item: ITaskJSON) =>
        this._parseJSONData(item)
      );
      const updatedRecord: ITask[] = record.filter(
        (item: ITask) => item.id !== id
      );
      const writeData = updatedRecord.map((item: ITask) =>
        this._writeJSONData(item)
      );
      await this.fileService.writeJSON(writeData);
    } catch (err) {
      throw new InternalServerErrorException(COMMON_ERROR.INTERNAL_ERROR);
    }
  }
}
