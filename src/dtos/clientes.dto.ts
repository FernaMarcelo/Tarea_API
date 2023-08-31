import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateclienteDto {
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

export class UpdateclienteDto {
    @IsString()
    @IsNotEmpty()
    public nombre: string;
  
    @IsString()
    @IsNotEmpty()
    public apellido: string;
}
