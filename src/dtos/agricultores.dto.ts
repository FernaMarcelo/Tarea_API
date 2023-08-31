import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateagricultoresDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  
  @IsString()
  @IsNotEmpty()
  public nombre: string;
 
  @IsString()
  @IsNotEmpty()
  public apellido: string;

}

export class UpdateagricultoresDto {
    @IsEmail()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsNotEmpty()
    public nombre: string;
   
    @IsString()
    @IsNotEmpty()
    public apellido: string;
}
