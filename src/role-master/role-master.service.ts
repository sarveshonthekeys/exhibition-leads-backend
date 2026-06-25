import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateRoleMasterDto } from './dto/create-role-master.dto';
import { UpdateRoleMasterDto } from './dto/update-role-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class RoleMasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleMasterDto: CreateRoleMasterDto): Promise<ResponseDto> {
    try {
      const response = await this.prisma.roleMaster.create({
        data: {
          orgId: createRoleMasterDto.orgId,
          roleName: createRoleMasterDto.roleName,
          roleDescription: createRoleMasterDto.roleDescription,
          menu: {
            create: createRoleMasterDto.menu?.map((menu) => ({
              roleMasterId: menu.roleMasterId,
              menuId: menu.menuId,
              menuName: menu.menuName,
            })),
          },
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create role',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.roleMaster.findMany({
        include: {
          menu: true,
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch roles',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.roleMaster.findUnique({
        where: { id },
        include: {
          menu: true,
        },
      });

      if (!response) {
        return {
          message: 'Role not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch role',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateRoleMasterDto: UpdateRoleMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.roleMaster.update({
        where: { id },
        data: {
          orgId: updateRoleMasterDto.orgId,
          roleName: updateRoleMasterDto.roleName,
          roleDescription: updateRoleMasterDto.roleDescription,
          menu: {
            deleteMany: {},
            create: updateRoleMasterDto.menu?.map((menu) => ({
              roleMasterId: menu.roleMasterId,
              menuId: menu.menuId,
              menuName: menu.menuName,
            })),
          },
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update role',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.roleMaster.delete({
        where: { id },
      });
      return {
        message: 'Role deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete role',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
