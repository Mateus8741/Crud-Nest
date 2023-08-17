import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Title of the post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Body of the post',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  authorId?: string;
}
