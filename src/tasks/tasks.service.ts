import { Injectable } from '@nestjs/common';
import { AccessTokenRepository } from '../repositories/access-token.repository';
import { MikroORM } from '@mikro-orm/core';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    private readonly orm: MikroORM,
    private readonly accessTokenRepository: AccessTokenRepository,
  ) {}

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'removeExpiredAccessTokens',
  })
  async removeExpiredAccessTokens(): Promise<void> {
    const em = this.orm.em.fork();
    await em.begin();
    const removeTokenExpire =
      await this.accessTokenRepository.removeExpiredAccessTokens();

    if (!removeTokenExpire) {
      await em.rollback();
      console.debug('Not found expired access tokens');
      return;
    }

    await em.commit();
    console.debug(`Removed ${removeTokenExpire} expired access tokens`);
  }
}
