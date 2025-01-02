import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createDocDto {
  @ApiProperty({
    description: "The title of the document",
    example: "Document 1",
  })
  title: string;

  @ApiProperty({
    description: "The content of the document",
    example: "Content of document 1",
  })
  content: string;

  @ApiProperty({
    description: "The id of the author of the document",
    example: "123e4567-e89b-12d3-a456-426655440000",
  })
  @IsNotEmpty()
  authorId: string;
}
