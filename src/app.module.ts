import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { rabbitmqOptions } from './config/rabbitmq.config';
import { typeOrmConfig } from './config/typeorm.config';
import { LeadModule } from './lead/lead.module';
import { LeadManagerModule } from './lead-manager/lead-manager.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'APP_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqOptions,
      },
    ]),
    LeadModule,
    LeadManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
