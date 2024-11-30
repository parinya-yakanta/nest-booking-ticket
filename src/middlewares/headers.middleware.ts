import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HeadersMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Request Headers ... ', req.headers.authorization);
    this.logger.log('Request Body ... ', req.body);
    this.logger.log('Request Query ... ', req.query);
    next();
  }
}
