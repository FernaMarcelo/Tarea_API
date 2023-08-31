import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatecamposDto {
  @IsString()
  @IsNotEmpty()
  public ubicacion: string;
  
  @IsString()
  @IsNotEmpty()
  public nombre: string;

}

export class UpdatecamposDto {
    @IsEmail()
    @IsNotEmpty()
    public ubicacion: string;
    
    @IsString()
    @IsNotEmpty()
    public nombre: string;
  
}
