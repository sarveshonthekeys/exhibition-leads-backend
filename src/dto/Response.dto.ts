import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  message: any;
  error?: any;
  statusCode: HttpStatus;
}
