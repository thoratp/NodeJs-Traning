import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    email?: string;
}
