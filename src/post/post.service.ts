import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOne(createPostDto.authorId);

    if (!user) {
      throw new Error('User not found');
    }

    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        body: createPostDto.body,
        author: {
          connect: {
            id: createPostDto.authorId,
          },
        },
      },
    });

    return {
      post,
    };
  }

  async findAll() {
    const post = await this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { post };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    return { post };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: { id },
    });
  }
}
