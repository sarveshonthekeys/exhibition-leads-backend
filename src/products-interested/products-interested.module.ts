import { Module } from '@nestjs/common';
import { ProductsInterestedService } from './products-interested.service';
import { ProductsInterestedController } from './products-interested.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductsInterestedController],
  providers: [ProductsInterestedService, PrismaService],
})
export class ProductsInterestedModule {}
