import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserBody } from './const';

@Injectable()
export class UserService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
  getUser(params: any) {
    console.log(params);
    return 'User';
  }
  addUser(params: UserBody) {
    console.log(params);
    return Array(parseInt(params.length) || 20)
      .fill(0)
      .map((i, index) => params?.name + '-' + index);
  }
}
