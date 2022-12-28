import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class AirlineDTO{
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    blocked?:string;
    @IsNotEmpty()
    @IsInt()
    id?:number;
}
