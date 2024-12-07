import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "The username of the user",
    example: "root",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: "The password of the user",
    example: "Root@123",
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
