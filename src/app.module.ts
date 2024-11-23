import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './modules/users/users.module';
import { AccessTokensModule } from './modules/access-tokens/access-tokens.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PartnersModule } from './modules/partners/partners.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    MikroOrmModule.forRoot(),
    UsersModule,
    AccessTokensModule,
    TicketsModule,
    PartnersModule,
    ProjectsModule,
    BookingsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
