import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuAssignmentMasterDto } from './dto/create-menu-assignment-master.dto';
import { UpdateMenuAssignmentMasterDto } from './dto/update-menu-assignment-master.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuAssignmentMasterService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMenuAssignmentMasterDto: CreateMenuAssignmentMasterDto) {
    return 'This action adds a new menuAssignmentMaster';
  }

  async findAll() {
    try {
      const response = await this.prisma.menuAssigned.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} menuAssignmentMaster`;
  }

  update(
    id: number,
    updateMenuAssignmentMasterDto: UpdateMenuAssignmentMasterDto,
  ) {
    return `This action updates a #${id} menuAssignmentMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuAssignmentMaster`;
  }
}
