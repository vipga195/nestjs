import { Injectable } from '@nestjs/common';

@Injectable()
export class Service {
    getUser(){
        return “User”;
      }
}
