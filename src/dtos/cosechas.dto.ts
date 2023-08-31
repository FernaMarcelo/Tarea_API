import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatecosechasDto {
  @IsNumber()
  @IsNotEmpty()
  public agricultor_id: number;

  @IsNumber()
  @IsNotEmpty()
  public campo_id: number;

  @IsNumber()
  @IsNotEmpty()
  public cliente_id: number;

  @IsString()
  @IsNotEmpty()
  public fruta: string;

  @IsString()
  @IsNotEmpty()
  public variedad: string;
}

export class UpdatecosechasDto {
  @IsNumber()
  @IsNotEmpty()
  public agricultor_id: number;

  @IsNumber()
  @IsNotEmpty()
  public campo_id: number;

  @IsNumber()
  @IsNotEmpty()
  public cliente_id: number;

  @IsString()
  @IsNotEmpty()
  public fruta: string;

  @IsString()
  @IsNotEmpty()
  public variedad: string;
}
