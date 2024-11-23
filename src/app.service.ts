import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloV1(): string {
    return 'Hello World! V1';
  }

  getHelloV2(): string {
    return 'Hello World! V2';
  }
}
