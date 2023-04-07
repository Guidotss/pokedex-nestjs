import { IsInt,IsPositive,Min,IsString,MinLength } from "class-validator";


export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    readonly no:number; 

    @IsString()
    @MinLength(3)
    readonly name:string; 
}
