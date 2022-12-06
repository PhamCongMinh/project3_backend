import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalNews, RentalNewsSchema } from '@models/entities/RentalNews';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { RentService } from '@modules/rent/rent.service';
import { RentController } from '@modules/rent/rent.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RentalNews.name,
        schema: RentalNewsSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [RentController],
  providers: [RentalNewsRepository, RentService],
  exports: [RentService],
})
export default class RentModule {}
