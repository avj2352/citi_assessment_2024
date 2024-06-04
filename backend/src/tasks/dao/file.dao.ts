import { Injectable } from "@nestjs/common";
import fs from "fs";
// ..custom
import { ITask } from "../models/tasks.model";

@Injectable()
export class FileService {
  private filePath: string;

  constructor() {
    this.filePath = "/util/data.json";
  }

  async readJSON(): Promise<ITask[]> {
    try {
      const data: ITask[] = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
      return data;
    } catch (error) {
      Promise.reject(`Error reading file:, ${(error as Error).message}`);
    }
  }
}
