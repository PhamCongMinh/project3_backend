import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { BlogService } from '@upload/blog/blog.service';
import { CreateBlogDto } from '@upload/blog/dto/request/createRentalNewsDto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('BlogController');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post(':id')
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    return this.blogService.createBlogs(req.user.id, createBlogDto);
  }

  @Get('/')
  async getBlog() {
    return this.blogService.getAllBlogs();
  }
}
