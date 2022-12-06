import { Controller, Get, Query } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { RentService } from '@upload/rent/rent.service';
import { ApiTags } from '@nestjs/swagger';
import { RentalNewsDocument } from '@models/entities/RentalNews';
import { FilterDto } from '@upload/rent/dto/request/filter.dto';

@ApiTags('Rent')
@Controller('rent')
export class RentController {
  constructor(
    private rentService: RentService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutController');
  }

  @Get('/')
  async filterRentalNews(@Query() filterData: FilterDto) {
    return this.rentService.filterRentalNews(filterData);
  }
}
