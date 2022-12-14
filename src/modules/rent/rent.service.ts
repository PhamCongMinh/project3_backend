import { Injectable } from '@nestjs/common';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { FilterDto } from '@upload/rent/dto/request/filter.dto';

@Injectable()
export class RentService {
  constructor(
    private rentalNewsRepository: RentalNewsRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentService');
  }

  filterRentalNews(filter: FilterDto) {
    if (!filter) return this.rentalNewsRepository.getAll();
    const {
      city,
      commune,
      district,
      minPricePerMonth,
      maxPricePerMonth,
      maxArea,
      minArea,
    } = filter;

    let query = {};
    if (city) query = { ...query, city: city };
    if (commune) query = { ...query, commune: commune };
    if (district) query = { ...query, district: district };

    if (minPricePerMonth && maxPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $in: [minPricePerMonth, maxPricePerMonth] },
      };

    if (minPricePerMonth && !maxPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $gt: minPricePerMonth },
      };

    if (maxPricePerMonth && !minPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $lt: maxPricePerMonth },
      };

    if (minArea && maxArea)
      query = {
        ...query,
        area: { $in: [minArea, maxArea] },
      };

    if (minArea && !maxArea)
      query = {
        ...query,
        area: { $gt: minArea },
      };

    if (maxArea && !minArea)
      query = {
        ...query,
        area: { $lt: maxArea },
      };

    return this.rentalNewsRepository.rentalNewsDocument.find(query);
  }
}
