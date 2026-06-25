import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UserMasterService } from './user-master.service';
import { CreateUserMasterDto } from './dto/create-user-master.dto';
import { UpdateUserMasterDto } from './dto/update-user-master.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from 'src/dto/Response.dto';

@Controller('user-master')
export class UserMasterController {
  constructor(private readonly userMasterService: UserMasterService) {}

  @Post()
  async create(
    @Body() createUserMasterDto: CreateUserMasterDto,
  ): Promise<ResponseDto> {
    return await this.userMasterService.create(createUserMasterDto);
  }

  @Get()
  async findAll(): Promise<ResponseDto> {
    return await this.userMasterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    return await this.userMasterService.findOne(+id);
  }
  @Get('org/:orgId')
  findByOrg(@Param('orgId') orgId: string) {
    return this.userMasterService.findByOrg(+orgId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserMasterDto: UpdateUserMasterDto,
  ): Promise<ResponseDto> {
    return await this.userMasterService.update(+id, updateUserMasterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto> {
    return await this.userMasterService.remove(+id);
  }

  @Post('send-otp')
  async sendOtp(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    if (!loginDto.email) {
      throw new BadRequestException('Email is required.');
    }
    const userExist = await this.userMasterService.checkUserExist(loginDto);
    console.log('user', userExist);

    if (
      userExist.statusCode === HttpStatus.BAD_REQUEST ||
      userExist.statusCode === HttpStatus.NOT_FOUND
    ) {
      throw new BadRequestException('User does not exist');
    }

    return await this.userMasterService.sendOtp(loginDto.email);
  }

  @Post('validate-otp')
  async validateOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('androidVersion') androidVersion: string,
    @Body('iosVersion') iosVersion: string,
    @Body('platform') platform: string,
  ): Promise<ResponseDto> {
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required.');
    }

    return await this.userMasterService.validateOtp(
      email,
      otp,
      androidVersion,
      iosVersion,
      platform,
    );
  }

  @Post('login-with-otp')
  async loginWithOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('androidVersion') androidVersion: string,
    @Body('iosVersion') iosVersion: string,
    @Body('platform') platform: string,
  ): Promise<ResponseDto> {
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required.');
    }

    return await this.userMasterService.validateOtp(
      email,
      otp,
      androidVersion,
      iosVersion,
      platform,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    return await this.userMasterService.login(loginDto);
  }
  @Post('generate-user-report')
  async generateAndSendUserReport(
    @Body() body: { email: string; sbuId: number },
  ) {
    const { email, sbuId } = body;

    if (!email) {
      throw new Error('Email address is required');
    }

    // Generate and send the report to the provided email address
    const filePath = await this.userMasterService.generateAndSendUserReport(
      email,
      sbuId,
    );

    return {
      message: 'User Report generated and sent successfully',
      filePath,
    };
  }
  @Get('status/:status')
  findOneBlock(@Param('status') status: string) {
    const isActive = status === 'true';
    return this.userMasterService.getUserByStatus(isActive);
  }
}
