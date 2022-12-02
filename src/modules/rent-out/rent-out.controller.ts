import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { RentOutService } from '@modules/rent-out/rent-out.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRentalNewsDto } from '@modules/rent-out/dto/request/createRentalNewsDto';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { UpdateRentalNewsDto } from '@modules/rent-out/dto/request/updateRentalNewsDto';

@ApiTags('RentOut')
@Controller('rent-out')
export class RentOutController {
  constructor(
    private rentOutService: RentOutService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutController');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('/')
  async createRentalNews(
    @Req() req,
    @Body() createRentalNews: CreateRentalNewsDto,
  ) {
    return this.rentOutService.createRentalNews(req.user.id, createRentalNews);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Put(':id')
  async updateRentalNews(
    @Param('id') id: string,
    @Body() updateRentalNews: UpdateRentalNewsDto,
  ) {
    return this.rentOutService.updateRentalNews(id, updateRentalNews);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Delete(':id')
  async deleteRentalNews(@Param('id') id: string) {
    return this.rentOutService.deleteRentalNews(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get('/')
  async getRentalNewsByOwner(@Req() req) {
    return this.rentOutService.getAllRentalNews(req.user.id);
  }
}
