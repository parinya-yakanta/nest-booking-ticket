import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/users/users.module';
import { AccessTokensModule } from './modules/access-tokens/access-tokens.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PartnersModule } from './modules/partners/partners.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy/mm/dd HH:MM',
            singleLine: true,
            ignore: 'pid,hostname', 
          },
        },
      },
    }),
    UsersModule,
    AccessTokensModule,
    TicketsModule,
    PartnersModule,
    ProjectsModule,
    BookingsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
