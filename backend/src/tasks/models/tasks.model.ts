/**
 * Task model as per requirement
 */
export type ITask = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createDate: Date;
  completedDate?: Date;
};

/**
 * Task model persisted as JSON file
 */
export type ITaskJSON = Pick<
  ITask,
  "id" | "title" | "description" | "completed"
> & {
  createdDate: string;
  completedDate: string;
};

/**
 * request payload type
 */
export type ITaskRequest = Pick<ITask, "title" | "description" | "completed">;
export type ITaskResponse = ITaskJSON;
