import { IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TaskParamIdDto {
  @ApiProperty({
    description: "Task id",
    required: true,
  })
  @IsNotEmpty()
  id: string;
}

export class TaskPayloadDto {
  @ApiProperty({
    description: "Task title",
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Task description",
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Task completed status - false for not done, true for done",
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
