import { validate } from "class-validator";
import { TaskParamIdDto, TaskPayloadDto } from "./tasks.dto";

let taskParamIdDto: TaskParamIdDto;
let taskPayloadDto: TaskPayloadDto;

describe("DTO Validation", () => {
  beforeAll(() => {
    taskParamIdDto = new TaskParamIdDto();
    taskPayloadDto = new TaskPayloadDto();
  });

  // validate GET param to not be undefined
  it("Task GET param id should not be undefined", async () => {
    const errors = await validate(taskParamIdDto);
    expect(errors.length).toBe(1);
    const expected = [
      {
        property: "id",
        constraints: {
          isNotEmpty: "id should not be empty",
        },
      },
    ];
    expect(errors).toMatchObject(expected);
  });

  // validate POST payload to not be undefined
  it("Task POST payload should not be undefined", async () => {
    const errors = await validate(taskPayloadDto);
    const expected = [
      {
        property: "title",
        constraints: {
          isNotEmpty: "title should not be empty",
        },
      },
      {
        property: "description",
        constraints: {
          isNotEmpty: "description should not be empty",
        },
      },
      {
        property: "completed",
        constraints: {
          isNotEmpty: "completed should not be empty",
        },
      },
    ];
    expect(errors).toMatchObject(expected);
  });
});
