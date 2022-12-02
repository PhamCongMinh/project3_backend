import { Injectable } from '@nestjs/common';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { CreateRentalNewsDto } from '@modules/rent-out/dto/request/createRentalNewsDto';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { UpdateRentalNewsDto } from '@modules/rent-out/dto/request/updateRentalNewsDto';

@Injectable()
export class RentOutService {
  constructor(
    private rentalNewsRepository: RentalNewsRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('RentOutService');
  }

  async getAllRentalNews(ownerId: string) {
    return this.rentalNewsRepository.findByOwnerId(ownerId);
  }

  async createRentalNews(ownerId: string, rentalNewsData: CreateRentalNewsDto) {
    const data = { ...rentalNewsData, ownerId };
    return this.rentalNewsRepository.create(data);
  }

  async deleteRentalNews(id: string) {
    return this.rentalNewsRepository.delete(id);
  }

  async updateRentalNews(id: string, rentalNewsData: UpdateRentalNewsDto) {
    return this.rentalNewsRepository.update(id, rentalNewsData);
  }
}
