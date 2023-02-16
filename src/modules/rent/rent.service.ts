import { Injectable } from '@nestjs/common';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { FilterDto } from '@modules/rent/dto/request/filter.dto';
import { RentalStatus } from '@models/entities/RentalNews';

@Injectable()
export class RentService {
  constructor(
    private rentalNewsRepository: RentalNewsRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentService');
  }

  filterRentalNews(filter: FilterDto) {
    console.log(filter);
    if (!filter) return this.rentalNewsRepository.getAll();
    const {
      city,
      commune,
      district,
      minPricePerMonth,
      maxPricePerMonth,
      maxArea,
      minArea,
      rentNewsType,
    } = filter;

    let query = {};
    if (city) query = { ...query, city: city };
    if (commune) query = { ...query, commune: commune };
    if (district) query = { ...query, district: district };
    if (rentNewsType) query = { ...query, rentNewsType: rentNewsType };

    if (minPricePerMonth && maxPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $in: [minPricePerMonth, maxPricePerMonth] },
      };

    if (minPricePerMonth && !maxPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $gte: minPricePerMonth },
      };

    if (maxPricePerMonth && !minPricePerMonth)
      query = {
        ...query,
        pricePerMonth: { $lte: maxPricePerMonth },
      };

    if (minArea && maxArea)
      query = {
        ...query,
        area: { $in: [minArea, maxArea] },
      };

    if (minArea && !maxArea)
      query = {
        ...query,
        area: { $gte: minArea },
      };

    if (maxArea && !minArea)
      query = {
        ...query,
        area: { $lte: maxArea },
      };

    query = {
      ...query,
      status: RentalStatus.AVAILABLE,
      endDay: { $gte: new Date() },
    };
    console.log('query', query);

    return this.rentalNewsRepository.rentalNewsDocument
      .find(query)
      .populate('ownerId')
      .populate({
        path: 'comments',
        populate: { path: 'ownerId' },
      });
  }
}
