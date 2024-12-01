import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/users/users.module';
import { AccessTokensModule } from './modules/access-tokens/access-tokens.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PartnerModule } from './modules/partners/partners.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BookingModule } from './modules/bookings/bookings.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LoggerModule } from 'nestjs-pino';
import { HeadersMiddleware } from './middlewares/headers.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    ScheduleModule.forRoot(),
    UsersModule,
    AccessTokensModule,
    TicketsModule,
    PartnerModule,
    ProjectsModule,
    BookingModule,
    OrdersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeadersMiddleware).forRoutes('*');
  }
}
