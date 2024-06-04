import { Injectable } from "@nestjs/common";
import fs from "fs";
// ..custom
import { ITask, ITaskJSON } from "../models/tasks.model";

@Injectable()
export class FileService {
  private filePath: string;

  constructor() {
    this.filePath = "/util/data.json";
  }

  async readJSON(): Promise<ITaskJSON[]> {
    try {
      const data: ITaskJSON[] = JSON.parse(
        fs.readFileSync(this.filePath, "utf-8")
      );
      return data;
    } catch (error) {
      Promise.reject(`Error reading file:, ${(error as Error).message}`);
    }
  }

  async writeJSON(data: ITaskJSON[]): Promise<string> {
    try {
      const jsonData = JSON.stringify(data, null, 2); // Add indentation for readability (optional)
      fs.writeFileSync(this.filePath, jsonData);
      return Promise.resolve(`Write to file done!`);
    } catch (error) {
      Promise.reject(`Error writing to file:, ${(error as Error).message}`);
    }
  }
}
