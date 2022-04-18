import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { UserService } from '../user-service';
import { Request } from 'express';
import { ApiResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UserBody } from '../const';
import { response } from 'Utils';
@Controller('user-controller')
export class UserControllerController {
  constructor(private readonly service: UserService) {}
  @Get()
  getUser(@Query() request: Request): string {
    return this.service.getUser(request);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  postUser(@Body() request: UserBody) {
    let data = this.service.addUser(request);
    if (data) {
      return response.success(data);
    }
  }
}
